
import './CellWidget.css'
import type CSS from "csstype";
import { Cell, PlacementState } from "../engine/engine.tsx"
import { v4 as uuidv4 } from 'uuid';


interface CellWidgetProps { value: Cell, highlight?: PlacementState }

export const CellWidget: React.FC<CellWidgetProps> = (props: CellWidgetProps) => {

    let optionalStyling: CSS.Properties = {};

    if (props.highlight != null) {
        switch (props.highlight) {

            case PlacementState.None:
                optionalStyling["filter"] = "grayscale(70%)";
                break;
            case PlacementState.OutOfBunds:
                // this should not be painted at all
                optionalStyling["backgroundColor"] = 'rgba(128, 0, 128, 0.9)';

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


    switch (props.value) {
        case Cell.Blue:
            return <div key={uuidv4()} style={optionalStyling} className='cell_base cell_blue'> </div>
        case Cell.Green:
            return <div key={uuidv4()} style={optionalStyling} className='cell_base cell_green'> </div>
        case Cell.Orange:
            return <div key={uuidv4()} style={optionalStyling} className='cell_base cell_orange'> </div>
        case Cell.Red:
            return <div key={uuidv4()} style={optionalStyling} className='cell_base cell_red'> </div>
        case Cell.Empty:
            return <div key={uuidv4()} className='cell_base cell_empty'> </div>
        case Cell.Border:
            return <div key={uuidv4()} className='cell_base cell_border'> </div>
        case Cell.None:
            return <div key={uuidv4()} className='cell_base cell_none'> </div>

    }
}

