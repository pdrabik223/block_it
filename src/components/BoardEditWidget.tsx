import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Board } from "../engine/engine.tsx";
import type { Shape } from "../engine/Shape.tsx";
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

}
export const BoardEditWidget: React.FC<BoardEditWidgetProps> = (props: BoardEditWidgetProps) => {
    const [selected, setSelected] = useState(-1)
    const [reDrawWidget, setReDrawWidget] = useState(false)

    return <>
        <BoardWidget refreshShapes={() => setReDrawWidget(!reDrawWidget)} board={props.board} highlightShape={(selected != -1) ? props.shapes[selected] : undefined} />
        <div className='row' style={{ flexWrap: 'wrap' }}>
            {props.shapes.map((object, i) =>
                <SelectableShape onPress={(id) => { setSelected(id) }} shapeId={i} isSelected={(selected == i)}>
                    <ShapeWidget shape={object} />
                </SelectableShape>)}
        </div>
    </>
}