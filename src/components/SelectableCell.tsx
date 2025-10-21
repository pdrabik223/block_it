
import { v4 as uuidv4 } from 'uuid';

interface SelectableCellProps {
    children: React.ReactNode,
    onHoverEvent?: (v: number, is_hovering: boolean) => void,
    onPress?: (v: number, e: MouseEvent) => void,
    cellPosition: number,
}

export const SelectableCell: React.FC<SelectableCellProps> = (props: SelectableCellProps) => {

    return <div
        className='selectable_cell'
        key={uuidv4()}
        onClick={(e) => {
            if (props.onPress != undefined)
                props.onPress(props.cellPosition, e.nativeEvent as MouseEvent)
        }}
        onMouseEnter={() => {
            if (props.onHoverEvent != undefined)
                props.onHoverEvent(props.cellPosition, true);

        }}
        onMouseLeave={() => {
            if (props.onHoverEvent != undefined)
                props.onHoverEvent(props.cellPosition, false);
        }}
    >
        {props.children}
    </div>
}
