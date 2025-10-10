import React, { useState, type JSX, useEffect } from "react";

import { BoardWidget } from "./BoardWidget.tsx";
import type { Board, Move } from "../engine/Board.tsx";
import { ShapeList } from "./ShapeList.tsx";
import type { Shape } from "../engine/Shape.tsx";
import Randy from "../engine/randy.tsx";


const engineMap = new Map<string, (board: Board, shapes: Shape[]) => Move | null>([
    ["Randy", Randy],
])

const delay = async (ms: number) => {
    return new Promise((resolve) =>
        setTimeout(resolve, ms));
};

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
    

    // I hate useEffect 
    useEffect(() => {

        console.log('AAAAAAAAA', props.iteration);
        setEngineStatus(<p>Calculating moves</p>);
        setTimeout(() => { }, 2000);
        let move = engineMap.get(props.engineName)!(props.board, props.shapes)

        if (move == null) {
            setEngineStatus(<p>No valid moves found, Abandoning game</p>);
            props.onAbandonGame();
        } else {
            setEngineStatus(<p>Move Found!</p>);
            props.board.makeMove(move)
            props.onMoveMade(move.shapeId)
        }

    }, [props.iteration]);

    return <>
        {props.title}
        {engineStatus}
        <BoardWidget onMoveMade={() => { }} board={props.board} />
        <ShapeList shapes={props.shapes} onPress={() => { }} lockSelection={true} selected={-1} />
    </>;

};
