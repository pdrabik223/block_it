import type { JSX } from "react";
import { Board } from "../engine/Board.tsx";
import { Cell, PlacementState } from "../engine/enum_definitions.tsx";
import type { Shape } from "../engine/Shape.tsx";
import { CellWidget } from "./CellWidget.tsx";
import { SelectableCell } from "./SelectableCell.tsx";
import { v4 as uuidv4 } from 'uuid';
import { Column } from "./Column.tsx";
import { Row } from "./Row.tsx";


function horizontalBorder(left_cell: Cell, right_cell: Cell, cellSize?: number): JSX.Element[] {

    let temp = [<CellWidget size={cellSize} value={left_cell} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget size={cellSize} value={Cell.Border} />);
    }
    temp.push(<CellWidget size={cellSize} value={right_cell} />)
    return temp;
}

export interface CellGridProps {
    board: Board
    cells: Cell[]
    errors: PlacementState[]
    ids_to_replace?: number[]
    highlightShape?: Shape
    onHoverEvent?: (v: number, is_hovering: boolean) => void
    onPress?: (v: number, e: MouseEvent) => void
    cellSize?: number
    showBorder?: boolean
}

export const CellGrid: React.FC<CellGridProps> = (props: CellGridProps) => {

    let data: JSX.Element[] = []
    let cellRow = []

    let showBorder = props.showBorder != undefined ? props.showBorder : true

    if (showBorder) {
        cellRow = horizontalBorder(props.board.cornerCells[0], props.board.cornerCells[1], props.cellSize);
        data.push(<Row key={uuidv4()} >{cellRow}</Row>);
    }

    for (let x = 0; x < Board.height; x++) {

        let cellRow = showBorder ? [<CellWidget size={props.cellSize} value={Cell.Border} />] : [];
        for (let y = 0; y < Board.width; y++) {

            let cell_widget = <CellWidget size={props.cellSize} value={props.board.get(x, y)} />

            if (props.ids_to_replace != undefined) {
                let shapeCellId = props.ids_to_replace.indexOf(x * Board.height + y)
                if (props.highlightShape != undefined && shapeCellId != -1) {
                    cell_widget = <CellWidget size={props.cellSize} highlight={props.errors[shapeCellId]}
                        value={props.cells[shapeCellId]} />
                }
            }

            cellRow.push(
                <SelectableCell
                    key={uuidv4()}
                    cellPosition={x * Board.height + y}
                    onHoverEvent={props.onHoverEvent}
                    onPress={props.onPress}>
                    {cell_widget}
                </SelectableCell>
            );
        }

        if (showBorder)
            cellRow.push(<CellWidget size={props.cellSize} value={Cell.Border} />);
        data.push(<Row key={uuidv4()} >{cellRow}</Row>);
    }
    // add bottom border
    if (showBorder) {
        cellRow = horizontalBorder(props.board.cornerCells[3], props.board.cornerCells[2], props.cellSize);
        data.push(<Row key={uuidv4()} >{cellRow}</Row>);
    }

    return <Column id="cellGrid"> {data}</Column>
}


