
import './CellWidget.css'
import type CSS from "csstype";
// import { Cell, PlacementState } from "./engi"

import { v4 as uuidv4 } from 'uuid';
import { Cell, PlacementState } from '../engine/enum_definitions.tsx';

interface CellWidgetProps { value: Cell, highlight?: PlacementState, size?: number }

export const CellWidget: React.FC<CellWidgetProps> = (props: CellWidgetProps) => {

    let optionalStyling: CSS.Properties = {};

    if (props.highlight != null) {
        switch (props.highlight) {

            case PlacementState.None:
                optionalStyling["filter"] = "grayscale(70%)";
                break;
            case PlacementState.OutOfBunds:
                // this should not be painted at all
                optionalStyling["backgroundColor"] = 'gray';

                break;
            case PlacementState.TouchingSameColorCorner:
                // vivid green (kept existing bright green)
                optionalStyling["backgroundColor"] = 'rgba(1, 247, 22, 1)';
                break;

            case PlacementState.OverlappingExisting:
            case PlacementState.TouchingEdge:
            default:
                // fallback (error state)
                optionalStyling["backgroundColor"] = 'rgba(249, 18, 18, 1)';
        }
    }

    if (props.size != null) {
        optionalStyling["width"] = `${props.size}px`
        optionalStyling["height"] = `${props.size}px`
    }

    let className = "cell_base ";

    switch (props.value) {
        case Cell.Blue:
            className += 'cell_blue'; break;
        case Cell.Green:
            className += 'cell_green'; break;
        case Cell.Orange:
            className += 'cell_orange'; break;
        case Cell.Red:
            className += 'cell_red'; break;
        case Cell.Empty:
            className += 'cell_empty'; break;
        case Cell.Border:
            className += 'cell_border'; break;
        case Cell.None:
            className += 'cell_none'; break;
    }

    return <div key={uuidv4()} style={optionalStyling} className={className}> </div>
}

