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

    return <div
        style={{ filter: class_name , padding:"4px"}}
        className='selectable_shape'
        key={uuidv4()}
        onClick={
            props.lockSelection ? undefined :
                () => {
                    props.onPress(props.shapeId);
                }}>
        {props.children}
    </div>
}
