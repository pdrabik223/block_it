
import { v4 as uuidv4 } from 'uuid';
import type React from "react";

import { SelectableShape } from "./SelectableShape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import { Shape } from "../engine/Shape.tsx";
import { Row } from "./Row.tsx";
import type { ShapeList } from "../engine/ShapeList.tsx";



export interface ShapeListProps {
    shapes: ShapeList
    lockSelection: boolean,
    onPress: (v: number) => void,
    selected: number
}


export const ShapeListWidget: React.FC<ShapeListProps> = (props: ShapeListProps) => {
    function countShapes() {
        let shapes: [number, Shape, number][] = []
        for (let s = 0; s < props.shapes.uniqueElementsLength(); s++) {
            shapes.push([props.shapes.noDuplicates(s), props.shapes.get(s), s]);
        }
        return shapes
    }

    return <Row style={{ flexWrap: 'wrap', marginTop: "20px", maxWidth: "900px " }}>
        {countShapes().map(([noRepeats, object, originalIndex]) => <SelectableShape
            key={uuidv4()}
            lockSelection={props.lockSelection}
            onPress={props.onPress}
            shapeId={originalIndex}
            isSelected={(props.selected == originalIndex)}>

            <ShapeWidget shape={object} noRepeats={noRepeats} />
        </SelectableShape>)}
    </Row>;
};

