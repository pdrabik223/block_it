import React, { useState, type JSX } from "react";

import { Board, Cell } from "../engine/Board.tsx";
import { Shape, shapeList } from "../engine/Shape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import { BoardWidget } from "./BoardWidget.tsx";

import './BoardEditWidget.css'
import { FullScreenOverlay } from "./FullScreenOverlay.tsx";

import './CellWidget.css'
import { SelectableShape } from "./SelectableShape.tsx";
import { ScoreBoard } from "./ScoreBoard.tsx";
import { Button } from "./Button.tsx";



function initShapeList(cell: Cell) {
    let list = []
    for (let shape of shapeList())
        list.push(new Shape(shape, cell))
    return list
}

function checkIfPLayerWon(shapes: Shape[][]) {
    for (var color = 0; color < shapes.length; color++) {
        if (shapes[color].length == 0) return color;
    }
    return null;
}

export class PlayerInfo {

    name: string;
    isEngine: boolean;
    endedPLay: boolean = false;

    constructor(name: string, isEngine: boolean) {
        this.name = name;
        this.isEngine = isEngine;
    }
}

interface GameLoopProps {
    playerNames: PlayerInfo[]
    returnToMainMenu: () => void
}

export const GameLoop: React.FC<GameLoopProps> = (props: GameLoopProps) => {

    const [selected, setSelected] = useState(-1)
    const [gameIteration, setGameIteration] = useState(0);
    const [board] = useState(new Board());
    const [shapes] = useState(() => {
        return [(initShapeList(Cell.Red)),
        (initShapeList(Cell.Blue)),
        (initShapeList(Cell.Green)),
        (initShapeList(Cell.Orange))]
    });

    let noPlayers = 4;
    let [gameEndedCache, iteration] = [false, 0]

    function gameEnded(): boolean {
        if (iteration == gameIteration) return gameEndedCache;
        // all players abandoned game
        // add case for moment when player has no moves left
        let playerColors = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange]
        board.getAllPossibleMovesForShapes(shapes[currentPLayerID()], playerColors[currentPLayerID()])

        if (nextPLayerID() == null) {
            gameEndedCache = true;
            iteration = gameIteration;
            return true;
        }

        // one player won and round ended
        if (checkIfPLayerWon(shapes) && currentPLayerID() == 3) {
            gameEndedCache = true;
            iteration = gameIteration;
            return true;
        }

        gameEndedCache = false;
        iteration = gameIteration;
        return false;

    }

    function currentPLayerID() {
        return gameIteration % noPlayers;
    }

    function nextPLayerID() {

        for (let i = 1; i <= props.playerNames.length; i++) {
            let nextid = (gameIteration + i) % noPlayers;
            let endedPlay = props.playerNames[nextid].endedPLay;
            if (!endedPlay) return nextid;
        }
        return null;
    }

    function onMoveMade(id?: number): void {
        if (id !== undefined)
            shapes[currentPLayerID()].splice(id, 1);

        setSelected(-1);

        if (nextPLayerID() != null)
            setGameIteration(nextPLayerID()!);
        else {
            setGameIteration(currentPLayerID() + 1)
        }
    }


    function getTitle(): JSX.Element | null {
        let textColors = ['cell_red', 'cell_blue', 'cell_green', 'cell_orange']

        return gameEnded() ? null : <h2 className={textColors[currentPLayerID()]} style={{ backgroundColor: "transparent" }}>{getPlayerNames()[currentPLayerID()]}</h2>;
    }

    function getButtons() {
        if (!gameEnded())
            return <div className="abandon_game_button" >
                <Button style={{ margin: "1%" }} onClick={() => { props.playerNames[currentPLayerID()].endedPLay = true; onMoveMade() }}> Abandon Game </Button>
                <Button onClick={() => setGameIteration(gameIteration + 1)} style={{ margin: "1%" }}> Skip turn </Button>
            </div>
    }

    function getShapeWidgets() {
        if (!gameEnded())
            return <div className='row' style={{ flexWrap: 'wrap' }}>
                {shapes[currentPLayerID()].map((object, i) =>
                    <SelectableShape onPress={setSelected} shapeId={i} isSelected={(selected == i)}>
                        <ShapeWidget shape={object} />
                    </SelectableShape>)}
            </div>
    }

    function getPlayerNames() {
        let names = [];
        for (let name of props.playerNames) {
            names.push(name.name)
        }
        return names;
    }

    function getHighlightedShape() {
        return (selected != -1) ? shapes[currentPLayerID()][selected] : undefined
    }

    return <>
        {getTitle()}
        {getButtons()}
        <BoardWidget onMoveMade={() => onMoveMade(selected)} board={board} highlightShape={getHighlightedShape()} />

        {getShapeWidgets()}

        <FullScreenOverlay show={gameEnded()}>
            <ScoreBoard returnToMainMenu={props.returnToMainMenu} shapes={shapes} playerNames={getPlayerNames()}></ScoreBoard>
        </FullScreenOverlay>
    </>
}