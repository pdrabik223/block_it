
import type CSS from "csstype";
import { v4 as uuidv4 } from 'uuid';
import { Cell, cellBlue, cellBorder, cellEmpty, cellGreen, cellNone, cellOrange, cellRed, PlacementState } from '../engine/enum_definitions.tsx';
import { CellStyle, globalSettingsState } from "../App.tsx";

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
    switch (globalSettingsState.cellStyle) {
        case CellStyle.Simple:
            return <div key={uuidv4()} style={style}></div>
        case CellStyle.Classic:
            return <div key={uuidv4()} style={style}>

                <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" x="0" y="0" fill={style["backgroundColor"]} />
                    <polygon points="0,0 100,100 0,100" fill={style["backgroundColor"]} style={{ filter: "brightness(0.6)" }} />
                </svg>
            </div>
    }
}

