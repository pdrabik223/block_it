import React, { useState, type JSX, useEffect, useRef } from "react";

import type { Board, Move } from "../engine/Board.tsx";

import type { Shape } from "../engine/Shape.tsx";
import Randy from "../engine/randy.tsx";
import Pointer from "../engine/pointer.tsx";
import Aggressive from "../engine/aggressive.tsx";
import { ShapeList } from "../components/ShapeList.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";


export const engineMap = new Map<string, (board: Board, shapes: Shape[]) => Move | null>([
    ["Randy", Randy],
    ["Pointer", Pointer],
    ["Aggressive", Aggressive]
])


export interface EngineGameUIProps {
    title: JSX.Element,
    board: Board,
    onMoveMade: (removedShapeId?: number) => void,
    onAbandonGame: () => void,
    shapes: Shape[],
    engineName: string,
    iteration: number
}

export const EngineGameUI: React.FC<EngineGameUIProps> = (props: EngineGameUIProps) => {

    const [engineStatus, setEngineStatus] = useState<JSX.Element>(<p>Idle</p>);
    function engineFunction() {
        console.log("engine func")

        let move = engineMap.get(props.engineName)!(props.board, props.shapes)

        if (move == null) {
            new Promise(() =>
                setTimeout(() => {
                    props.onAbandonGame();
                }, 250));

        } else {
            props.board.makeMove(move)
            setEngineStatus(<p> Made move!</p>)
            new Promise(() =>
                setTimeout(() => {
                    props.onMoveMade(move.shapeId)
                }, 250));

        }

    }
    // on prod this needs to be flipped
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            engineFunction();
        }

    }, [props.iteration]);
  
    return <>
        {props.title}
        {engineStatus}
        <BoardWidget onMoveMade={() => { }} board={props.board} />
        <ShapeList shapes={props.shapes} onPress={() => { }} lockSelection={true} selected={-1} />
    </>;

};
