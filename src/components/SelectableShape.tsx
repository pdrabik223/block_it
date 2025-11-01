import { v4 as uuidv4 } from 'uuid';

import "./SelectableShape.css"

interface SelectableShapeProps {
    children: React.ReactNode,
    onPress: (v: number) => void,
    shapeId: number,
    isSelected?: boolean,
    lockSelection?: boolean
}

export const SelectableShape: React.FC<SelectableShapeProps> = (props: SelectableShapeProps) => {

    let isSelected = props.isSelected != undefined ? props.isSelected : false

    let lockSelection = props.lockSelection != undefined ? props.lockSelection : false

    let class_name: string = isSelected ? "brightness(1)" : "brightness(0.6)"

    let cursor = lockSelection ? undefined : 'pointer'

    return <div
        // add on hover animation
        style={{ filter: class_name, padding: "8px", cursor: cursor }}
        className='selectableShape'
        key={uuidv4()}
        onClick={
            props.lockSelection ? undefined :
                () => {
                    props.onPress(props.shapeId);
                }}>
        {props.children}
    </div>
}
