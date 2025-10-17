
import type CSS from "csstype";
import { v4 as uuidv4 } from 'uuid';
import { Cell, cellBlue, cellBorder, cellEmpty, cellGreen, cellNone, cellOrange, cellRed, PlacementState } from '../engine/enum_definitions.tsx';

interface CellWidgetProps {
    value: Cell,
    highlight?: PlacementState,
    size?: number
}

export const CellWidget: React.FC<CellWidgetProps> = (props: CellWidgetProps) => {

    let style: CSS.Properties = {};

    const size = props.size != undefined ? props.size : 28

    style["width"] = `${size}px`
    style["height"] = `${size}px`
    style["margin"] = '2px'

    switch (props.value) {
        case Cell.Blue:
            style["backgroundColor"] = cellBlue; break;
        case Cell.Green:
            style["backgroundColor"] = cellGreen; break;
        case Cell.Orange:
            style["backgroundColor"] = cellOrange; break;
        case Cell.Red:
            style["backgroundColor"] = cellRed; break;
        case Cell.Empty:
            style["backgroundColor"] = cellEmpty; break;
        case Cell.Border:
            style["backgroundColor"] = cellBorder; break;
        case Cell.None:
            style["backgroundColor"] = cellNone; break;
    }

    if (props.highlight != null) {
        switch (props.highlight) {

            case PlacementState.None:
                style["filter"] = "grayscale(70%)";
                break;

            case PlacementState.OutOfBunds:
                style["backgroundColor"] = 'gray';
                break;

            case PlacementState.TouchingSameColorCorner:
                style["backgroundColor"] = 'rgba(1, 247, 22, 1)';
                break;

            case PlacementState.OverlappingExisting:
            case PlacementState.TouchingEdge:
            default:
                style["backgroundColor"] = 'rgba(249, 18, 18, 1)';
        }
    }

    return <div key={uuidv4()} style={style}> </div>
}

