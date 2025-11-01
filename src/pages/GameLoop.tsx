import React, { useState, type JSX } from "react";

import { Board } from "../engine/Board.tsx";
import { Cell, cellBlue, cellGreen, cellOrange, cellRed } from "../engine/enum_definitions.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";
import { ScoreBoard } from "../components/ScoreBoard.tsx";
import { FullScreenOverlay } from "../components/FullScreenOverlay.tsx";
import { EngineGameUI } from "./EngineGameUI.tsx";
import { ShapeListWidget } from "../components/ShapeListWidget.tsx";
import { PlayerGameUI } from "./PlayerGameUI.tsx";
import { globalSettingsState } from "../App.tsx";
import { Estimation2Player, Estimation4Player } from "../engine/requ.tsx";
import { ShapeList } from "../engine/ShapeList.tsx";


function checkIfPLayerWon(shapes: ShapeList[]) {
    for (var color = 0; color < shapes.length; color++) {
        if (shapes[color].isEmpty()) return color;
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
        return [ShapeList.GenerateShapes(Cell.Red, 2), ShapeList.GenerateShapes(Cell.Blue, 2)]
    }
    return [
        ShapeList.GenerateShapes(Cell.Red),
        ShapeList.GenerateShapes(Cell.Blue),
        ShapeList.GenerateShapes(Cell.Green),
        ShapeList.GenerateShapes(Cell.Orange),
    ]
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

    function currentPLayerColor(): Cell {
        let colors = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange]
        return colors[currentPLayerID()];
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

            let hasShapesLeft = shapes[nextid].noShapes() != 0
            if (!hasShapesLeft) continue;

            let hasMoves = board.getAllPossibleMovesForShapes(shapes[nextid]).length != 0
            if (!hasMoves) continue;

            return nextid;
        }

        return null;
    }

    function onMoveMade(id?: number): void {

        if (id != undefined)
            shapes[currentPLayerID()].remove(id);

        if (selected != -1) setSelected(-1);

        let nextPLayer = nextPLayerID()

        if (nextPLayer != null) {

            setMoveCounter(moveCounter + 1);
            setGameIteration(nextPLayer);
        }
        else {
            setGameEnded(true)
        }
    }

    function getTitle(): JSX.Element {
        let textColors = [cellRed, cellBlue, cellGreen, cellOrange]
        return <h1 style={{ backgroundColor: "transparent", color: textColors[currentPLayerID()] }}>{getPlayerNames()[currentPLayerID()]}</h1>;
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
            shapes={shapes}
            playerColor={currentPLayerColor()}
            onMoveMade={(v?: number) => (onMoveMade(v))}
            engineName={getPlayerNames()[currentPLayerID()]}
            iteration={moveCounter}
            noPlayers={noPlayers()}
            gameStatistics={getGameState()}
            gameEvaluation={getEvaluation()}
        />
    }

    function getHighlightedShape() {
        return (selected != -1) ? shapes[currentPLayerID()].get(selected) : undefined
    }

    function getGameState(): [Cell, number, number][] | undefined {
        if (!globalSettingsState.showMovesCount) return undefined;

        let points: number[] = [0, 0, 0, 0]

        for (let color = 0; color < noPlayers(); color++) {
            // for (let shape of shapes[color])
            points[color] = shapes[color].getPoints()

        }

        if (noPlayers() == 2) return [
            [Cell.Red, shapes[0].noShapes(), points[0]],
            [Cell.Blue, shapes[1].noShapes(), points[1]]
        ]

        return [
            [Cell.Red, shapes[0].noShapes(), points[0]],
            [Cell.Blue, shapes[1].noShapes(), points[1]],
            [Cell.Green, shapes[2].noShapes(), points[2]],
            [Cell.Orange, shapes[3].noShapes(), points[3]]
        ]
    }

    function getEvaluation(): [Cell, number][] | undefined {
        if (!globalSettingsState.showPositionEvaluation) return undefined;

        if (noPlayers() == 2)
            return Estimation2Player(shapes[0], shapes[1])

        return Estimation4Player(shapes[0], shapes[1], shapes[2], shapes[3])
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
        shapeWidgets={<ShapeListWidget shapes={shapes[currentPLayerID()]} onPress={setSelected} lockSelection={false} selected={selected} />}
        gameStatistics={getGameState()}
        gameEvaluation={getEvaluation()}

    />

}


