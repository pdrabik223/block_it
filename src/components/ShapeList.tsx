import type React from "react";
import { SelectableShape } from "./SelectableShape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import type { Shape } from "../engine/Shape.tsx";

export interface ShapeListProps {
    shapes: Shape[]
    lockSelection: boolean,
    onPress: (v: number) => void,
    selected: number
}


export const ShapeList: React.FC<ShapeListProps> = (props: ShapeListProps) => {

    return <div className='row' style={{ flexWrap: 'wrap' }}>
        {props.shapes.map((object, i) => <SelectableShape lockSelection={props.lockSelection} onPress={props.onPress} shapeId={i} isSelected={(props.selected == i)}>
            <ShapeWidget shape={object} />
        </SelectableShape>)}
    </div>;
};
