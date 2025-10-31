import React, { type JSX, useEffect, useRef } from "react";

import { Board, type Move } from "../engine/Board.tsx";

import Randy from "../engine/randy.tsx";
import Pointer from "../engine/pointer.tsx";
import Aggressive from "../engine/aggressive.tsx";
import { ShapeListWidget } from "../components/ShapeListWidget.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";
import { globalSettingsState } from "../App.tsx";
import { Button } from "../components/Button.tsx";
import pointer_coroner, { coroner } from "../engine/hanging_corners_maximizer.tsx";
import AntiKiller from "../engine/dead_cells_minimizer.tsx";
import { TitleGroup } from "./TitleGroup.tsx";
import { Cell } from "../engine/enum_definitions.tsx";
import { EvaluationBar } from "./EvaluationBar.tsx";
import minMax2Player from "../engine/requ.tsx";
import type { ShapeList } from "../engine/ShapeList.tsx";
import { logInfo } from "../engine/logger.tsx";


export const basicEnginesMap = new Map<string, (board: Board, shapes: ShapeList) => Move | null>([
    ["Randy", Randy],
    ["Pointer", Pointer],
    ["Aggressive", Aggressive],
    ["PointerCoroner", pointer_coroner],
    ["Coroner", coroner],
    ["AntiKiller", AntiKiller],
])

export const advancedEnginesMap2Player = new Map<string, (playerColor: Cell, requDepth: number, board: Board, redShapes: ShapeList, blueShapes: ShapeList) => Move | null>([
    ["MinMax2Player", minMax2Player],
])

export const advancedEnginesMap4Player = new Map<string, (playerColor: Cell, requDepth: number, board: Board, redShapes: ShapeList, blueShapes: ShapeList) => Move | null>([

])


export interface EngineGameUIProps {
    title: JSX.Element,
    board: Board,
    onMoveMade: (removedShapeId?: number) => void,
    onAbandonGame: () => void,
    onEndGame: () => void
    shapes: ShapeList[],
    playerColor: Cell,
    engineName: string,
    iteration: number,
    noPlayers: number,
    gameStatistics?: [color: Cell, noShapes: number, noPoints: number][]
    gameEvaluation?: [color: Cell, estimation: number][]

}

function getShapesForPlayer(player: Cell, shapes: ShapeList[]): ShapeList {
    switch (player) {
        case Cell.Red:
            return shapes[0]
        case Cell.Orange:
            return shapes[3]
        case Cell.Green:
            return shapes[2]
        case Cell.Blue:
            return shapes[1]

    }
    throw Error("Color not valid")
}

export const EngineGameUI: React.FC<EngineGameUIProps> = (props: EngineGameUIProps) => {
    let move: Move | null = null

    function engineFunction() {

        if (basicEnginesMap.get(props.engineName) != null)
            move = basicEnginesMap.get(props.engineName)!(props.board, getShapesForPlayer(props.playerColor, props.shapes))

        else if (advancedEnginesMap2Player.get(props.engineName) != null)
            move = advancedEnginesMap2Player.get(props.engineName)!(props.playerColor, 3, props.board, props.shapes[0], props.shapes[1])

        else throw Error(`Engine ${props.engineName} not found`)

        if (move === null) {
            new Promise(() =>
                setTimeout(() => {
                    props.onAbandonGame();
                }, globalSettingsState.moveDelayMS));

        } else {
            props.board.makeMove(move)

            new Promise(() =>
                setTimeout(() => {
                    props.onMoveMade(move!.shapeId)
                }, globalSettingsState.moveDelayMS));

        }

    }
    // on prod this needs to be flipped
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            engineFunction();
        }

    }, [props.iteration]);

    return <>
        <TitleGroup gameStatistics={props.gameStatistics}
            title={props.title}
            buttons={<Button onClick={props.onEndGame}
                style={{ margin: "1%" }}> End Game </Button>}>
        </TitleGroup>
        <EvaluationBar gameStatistics={props.gameEvaluation}></EvaluationBar>
        <BoardWidget onMoveMade={() => { }} board={props.board} />
        <ShapeListWidget shapes={getShapesForPlayer(props.playerColor, props.shapes)} onPress={() => { }} lockSelection={true} selected={-1} />
    </>;

};
