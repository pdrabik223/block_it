import React, { useState, type JSX } from "react";

import { Board } from "../engine/Board.tsx";
import { Shape, shapeList } from "../engine/Shape.tsx";

import '../components/CellWidget.css'
import { Cell } from "../engine/enum_definitions.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";
import { ScoreBoard } from "../components/ScoreBoard.tsx";
import { FullScreenOverlay } from "../components/FullScreenOverlay.tsx";
import { EngineGameUI } from "./EngineGameUI.tsx";
import { ShapeList } from "../components/ShapeList.tsx";
import { PlayerGameUI } from "./PlayerGameUI.tsx";
import { logInfo } from "../engine/logger.tsx";



function initShapeList(cell: Cell, noDuplicates: number = 1) {
    let list = []
    for (let shape of shapeList())
        for (let x = 0; x < noDuplicates; x++)
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

function initBoard(playerNames: PlayerInfo[]) {
    if (playerNames.length == 2) {

        let board = new Board()
        board.cornerCells = [Cell.Red, Cell.Red, Cell.Blue, Cell.Blue]
        return board
    }

    return new Board();
}

function initShapes(playerNames: PlayerInfo[]) {
    if (playerNames.length == 2) {
        return [initShapeList(Cell.Red, 2), initShapeList(Cell.Blue, 2)]
    }

    return [(initShapeList(Cell.Red)),
    (initShapeList(Cell.Blue)),
    (initShapeList(Cell.Green)),
    (initShapeList(Cell.Orange))]
}

export const GameLoop: React.FC<GameLoopProps> = (props: GameLoopProps) => {

    const [selected, setSelected] = useState(-1)
    const [gameIteration, setGameIteration] = useState(0);
    const [board, setBoard] = useState(initBoard(props.playerNames));
    const [shapes, setShapes] = useState(initShapes(props.playerNames));
    const [moveCounter, setMoveCounter] = useState(0);
    const [gameEnded, setGameEnded] = useState<boolean>(false)

    function resetState() {
        setSelected(-1)
        setGameIteration(0)
        setBoard(initBoard(props.playerNames))
        setShapes(initShapes(props.playerNames))
        setMoveCounter(0)
        setGameEnded(false)
        for (let i = 0; i < props.playerNames.length; i++) {
            props.playerNames[i].endedPLay = false;
        }
    }

    function noPlayers() {
        return props.playerNames.length;
    }

    function currentPLayerID(): number {
        return gameIteration % noPlayers();
    }

    function isCurrentPlayerEngine() {
        return props.playerNames[currentPLayerID()].isEngine
    }

    function nextPLayerID(): number | null {

        let winner = checkIfPLayerWon(shapes)

        let aPlayerWon = winner != null

        for (let i = 1; i <= props.playerNames.length; i++) {
            let nextid = (gameIteration + i) % noPlayers();

            if (aPlayerWon && nextid == 0) break;

            let endedPlay = props.playerNames[nextid].endedPLay;
            if (endedPlay) continue;

            let hasShapesLeft = shapes[nextid].length != 0
            if (!hasShapesLeft) continue;

            let hasMoves = board.getAllPossibleMovesForShapes(shapes[nextid]).length != 0
            if (!hasMoves) continue;

            return nextid;
        }

        return null;
    }

    function onMoveMade(id?: number): void {

        if (id != undefined)
            shapes[currentPLayerID()].splice(id, 1);

        if (selected != -1) setSelected(-1);

        let nextPLayer = nextPLayerID()

        logInfo("PLayer:", nextPLayer)
        
        if (nextPLayer != null) {

            setMoveCounter(moveCounter + 1);
            setGameIteration(nextPLayer);
        }
        else {
            setGameEnded(true)
        }
    }

    function getTitle(): JSX.Element {
        let textColors = ['cell_red', 'cell_blue', 'cell_green', 'cell_orange']

        return <h1 className={textColors[currentPLayerID()]} style={{ backgroundColor: "transparent" }}>{getPlayerNames()[currentPLayerID()]}</h1>;
    }

    function getPlayerNames() {
        let names = [];
        for (let name of props.playerNames) {
            names.push(name.name)
        }
        return names;
    }

    if (gameEnded) {
        return <>
            <BoardWidget onMoveMade={() => { }} board={board} highlightShape={undefined} />
            <FullScreenOverlay show={true} opacity={0.8}>
                <ScoreBoard tryAgain={resetState} returnToMainMenu={props.returnToMainMenu} shapes={shapes} playerNames={getPlayerNames()}></ScoreBoard>
            </FullScreenOverlay>
        </>
    }

    if (isCurrentPlayerEngine()) {

        return <EngineGameUI
            title={getTitle()!}
            board={board}
            onEndGame={props.returnToMainMenu}
            onAbandonGame={() => { props.playerNames[currentPLayerID()].endedPLay = true; onMoveMade() }}
            shapes={shapes[currentPLayerID()]}
            onMoveMade={(v?: number) => (onMoveMade(v))}
            engineName={getPlayerNames()[currentPLayerID()]}
            iteration={moveCounter}
        />
    }

    function getHighlightedShape() {
        return (selected != -1) ? shapes[currentPLayerID()][selected] : undefined
    }

    return <PlayerGameUI
        title={getTitle()!}
        onEndGame={props.returnToMainMenu}
        onGameAbandonButton={() => { props.playerNames[currentPLayerID()].endedPLay = true; onMoveMade() }}
        onSkipTurnButton={() => onMoveMade()}
        onShapeCancel={() => setSelected(-1)}
        onMoveMade={() => onMoveMade(selected)}
        highlightedShape={getHighlightedShape()}

        board={board}
        shapeWidgets={<ShapeList shapes={shapes[currentPLayerID()]} onPress={setSelected} lockSelection={false} selected={selected} />}
    />

}


