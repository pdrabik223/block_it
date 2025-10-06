import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Board, Cell } from "../engine/engine.tsx";
import { Shape, Shapes } from "../engine/Shape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import { BoardWidget } from "./BoardWidget.tsx";

import './BoardEditWidget.css'

interface SelectableShapeProps {
    children: React.ReactNode,
    onPress: (v: number) => void,
    isSelected: boolean,
    shapeId: number
}

export const SelectableShape: React.FC<SelectableShapeProps> = (props: SelectableShapeProps) => {

    let class_name: string = props.isSelected ? "brightness(1)" : "brightness(0.6)"

    return <div
        style={{ filter: class_name }}
        className='selectable_shape'
        key={uuidv4()}
        onClick={() => {
            props.onPress(props.shapeId);
        }}>
        {props.children}
    </div>
}

interface BoardEditWidgetProps {
    board: Board;
    shapes: Shape[];
    onMoveMade: () => void;
}

export const BoardEditWidget: React.FC<BoardEditWidgetProps> = (props: BoardEditWidgetProps) => {
    const [selected, setSelected] = useState(-1)
    const [reDrawWidget, setReDrawWidget] = useState(false)

    return <>
        <BoardWidget popShape={(shape: Shape) => { props.shapes = props.shapes.splice(props.shapes.indexOf(shape), 1); }} onMoveMade={props.onMoveMade} refreshShapes={() => setReDrawWidget(!reDrawWidget)} board={props.board} highlightShape={(selected != -1) ? props.shapes[selected] : undefined} />
        <div className='row' style={{ flexWrap: 'wrap' }}>
            {props.shapes.map((object, i) =>
                <SelectableShape onPress={(id) => { setSelected(id) }} shapeId={i} isSelected={(selected == i)}>
                    <ShapeWidget shape={object} />
                </SelectableShape>)}
        </div>
    </>
}

interface GameLoopProps {
    // must be the same length as colors
    playerNames: string[]
    // Assuming colors are ordered correctly Cell.Red, Cell.Blue, Cell.Green, Cell.Yellow
    // colors: Cell[]
}

function initShapeList(cell: Cell) {
    return [
        // new Shape(Shapes.Dot, cell),
        // new Shape(Shapes.Tuple, cell),
        // new Shape(Shapes.Triple, cell),
        // new Shape(Shapes.Square, cell),
        // new Shape(Shapes.TripleLine, cell),
        // new Shape(Shapes.Cross, cell),
        // new Shape(Shapes.TripleT, cell),
        // new Shape(Shapes.BigTripleT, cell),
        // new Shape(Shapes.TripleC, cell),
        // new Shape(Shapes.Bolt, cell),
        // new Shape(Shapes.TripleL, cell),
        // new Shape(Shapes.BigTripleL, cell),
        // new Shape(Shapes.TripleP, cell),
        // new Shape(Shapes.OffsetCross, cell),
        // new Shape(Shapes.Snake, cell),
        // new Shape(Shapes.TripleW, cell),
        // new Shape(Shapes.QuadrupleLine, cell),
        // new Shape(Shapes.QuadrupleL, cell),
        // new Shape(Shapes.QuadrupleOffsetL, cell),
        new Shape(Shapes.QuadrupleBolt, cell),
        new Shape(Shapes.PentaLine, cell)


    ]
}
export const GameLoop: React.FC<GameLoopProps> = (props: GameLoopProps) => {


    const [gameIteration, setGameIteration] = useState(0);
    const [board, setBoard] = useState(new Board());
    const [shapes, setShapes] = useState(() => {
        return [(initShapeList(Cell.Red)),
        (initShapeList(Cell.Blue)),
        (initShapeList(Cell.Green)),
        (initShapeList(Cell.Orange))]
    });
    // let shapes: Shape[][] = []/

    // let board = ;
    let noPlayers = 4;

    switch (props.playerNames.length) {
        case 4:
            shapes.push(initShapeList(Cell.Red));
            shapes.push(initShapeList(Cell.Blue));
            shapes.push(initShapeList(Cell.Green));
            shapes.push(initShapeList(Cell.Orange));
            break;

        default:
            throw Error('game requires 4 players')

    }


    return <>
        <h2>{props.playerNames[gameIteration % noPlayers]}</h2>
        <BoardEditWidget onMoveMade={() => { setGameIteration(gameIteration + 1); }} board={board} shapes={shapes[gameIteration % noPlayers]}></BoardEditWidget>
    </>
}
