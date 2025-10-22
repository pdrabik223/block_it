import { v4 as uuidv4 } from 'uuid';

interface SelectableShapeProps {
    children: React.ReactNode,
    onPress: (v: number) => void,
    isSelected: boolean,
    shapeId: number,
    lockSelection: boolean
}

export const SelectableShape: React.FC<SelectableShapeProps> = (props: SelectableShapeProps) => {

    let class_name: string = props.isSelected ? "brightness(1)" : "brightness(0.6)"
    let cursor = props.lockSelection ? undefined : 'pointer'
    return <div
        style={{ filter: class_name, padding: "8px", cursor: cursor }}
        
        key={uuidv4()}
        onClick={
            props.lockSelection ? undefined :
                () => {
                    props.onPress(props.shapeId);
                }}>
        {props.children}
    </div>
}
