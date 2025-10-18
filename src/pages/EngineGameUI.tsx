import React, { type JSX, useEffect, useRef } from "react";

import type { Board, Move } from "../engine/Board.tsx";

import type { Shape } from "../engine/Shape.tsx";
import Randy from "../engine/randy.tsx";
import Pointer from "../engine/pointer.tsx";
import Aggressive from "../engine/aggressive.tsx";
import { ShapeList } from "../components/ShapeList.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";
import { globalSettingsState } from "../App.tsx";
import { Button } from "../components/Button.tsx";
import Coroner from "../engine/hanging_corners_maximizer.tsx";
import AntiKiller from "../engine/dead_cells_minimizer.tsx";
import { TitleGroup } from "./TitleGroup.tsx";
import type { Cell } from "../engine/enum_definitions.tsx";
import { EvaluationBar } from "./EvaluationBar.tsx";


export const engineMap = new Map<string, (board: Board, shapes: Shape[]) => Move | null>([
    ["Randy", Randy],
    ["Pointer", Pointer],
    ["Aggressive", Aggressive],
    ["Coroner", Coroner],
    ["AntiKiller", AntiKiller]
])


export interface EngineGameUIProps {
    title: JSX.Element,
    board: Board,
    onMoveMade: (removedShapeId?: number) => void,
    onAbandonGame: () => void,
    onEndGame: () => void
    shapes: Shape[],
    engineName: string,
    iteration: number,
    gameStatistics?: [color: Cell, noShapes: number, noPoints: number][]
    gameEvaluation?: [color: Cell, estimation: number][]

}

export const EngineGameUI: React.FC<EngineGameUIProps> = (props: EngineGameUIProps) => {

    function engineFunction() {

        let move = engineMap.get(props.engineName)!(props.board, props.shapes)

        if (move == null) {
            new Promise(() =>
                setTimeout(() => {
                    props.onAbandonGame();
                }, globalSettingsState.moveDelayMS));

        } else {
            props.board.makeMove(move)

            new Promise(() =>
                setTimeout(() => {
                    props.onMoveMade(move.shapeId)
                }, globalSettingsState.moveDelayMS));

        }

    }
    // on prod this needs to be flipped
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = true;
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
        <ShapeList shapes={props.shapes} onPress={() => { }} lockSelection={true} selected={-1} />
    </>;

};
