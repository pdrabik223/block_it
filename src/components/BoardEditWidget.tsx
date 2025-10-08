import React, { useState, type JSX } from "react";

import { Board, Cell } from "../engine/Board.tsx";
import { Shape, shapeList, Shapes } from "../engine/Shape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import { BoardWidget } from "./BoardWidget.tsx";

import './BoardEditWidget.css'
import { FullScreenOverlay } from "./FullScreenOverlay.tsx";

import './CellWidget.css'
import { SelectableShape } from "./SelectableShape.tsx";



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
    const [board, setBoard] = useState(new Board());
    const [shapes, setShapes] = useState(() => {
        return [(initShapeList(Cell.Red)),
        (initShapeList(Cell.Blue)),
        (initShapeList(Cell.Green)),
        (initShapeList(Cell.Orange))]
    });

    let noPlayers = 4;

    let playerWon = checkIfPLayerWon(shapes)

    function gameEnded(): boolean {
        // all players abandoned game
        if (nextPLayerID() == null) return true;

        // one player won and round ended
        if (checkIfPLayerWon(shapes) && currentPLayerID() == 3) return true;
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
            playerWon = 1;
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
                <button style={{ margin: "1%" }} onClick={() => { props.playerNames[currentPLayerID()].endedPLay = true; onMoveMade() }}> Abandon Game </button>
                <button onClick={() => setGameIteration(gameIteration + 1)} style={{ margin: "1%" }}> Skip turn </button>
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


export interface ScoreBoardProps {
    shapes: Shape[][];
    playerNames: string[];
    returnToMainMenu: () => void
}

class PlayerResultInfo {
    name: string
    points: number
    color: string
    constructor(name: string,
        points: number,
        color: string) {

        this.name = name
        this.points = points
        this.color = color
    }
}

export const ScoreBoard: React.FC<ScoreBoardProps> = (props: ScoreBoardProps) => {

    let scoreBoard = new Array<PlayerResultInfo>()
    let textColors = ['cell_red', 'cell_blue', 'cell_green', 'cell_orange']

    for (let playerID = 0; playerID < props.playerNames.length; playerID++) {

        var total = 0;

        for (let i = 0; i < props.shapes[playerID].length; i++) {
            total += props.shapes[playerID][i].points();
        }
        scoreBoard.push(new PlayerResultInfo(props.playerNames[playerID], total, textColors[playerID]))
    }

    let column: JSX.Element[] = []

    for (let player of scoreBoard) {

        column.push(
            <div className='row' >
                <h2 className={player.color} style={{ backgroundColor: "transparent" }}>{player.name}</h2>
                <h2 style={{ width: "4rem", backgroundColor: "transparent" }} className={player.color}>{player.points}</h2>
            </div>
        )

    }

    return <div className="column" style={{ height: "100%" }} >
        <div>
            <h1>Game Over!</h1>
            <div className="column">
                {column}
            </div>
            <button onClick={props.returnToMainMenu}>Main menu</button>
        </div>
    </div>;
};

