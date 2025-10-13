import type { JSX } from "react";
import { Board } from "../engine/Board.tsx";
import { Cell, PlacementState } from "../engine/enum_definitions.tsx";
import type { Shape } from "../engine/Shape.tsx";
import { CellWidget } from "./CellWidget.tsx";
import { SelectableCell } from "./SelectableCell.tsx";
import { v4 as uuidv4 } from 'uuid';


function horizontalBorder(left_cell: Cell, right_cell: Cell): JSX.Element[] {

    let temp = [<CellWidget value={left_cell} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={right_cell} />)
    return temp;
}

export interface CellGridProps {
    board: Board,
    ids_to_replace: number[] | null;
    cells: Cell[];
    errors: PlacementState[];
    highlightShape?: Shape
    onHoverEvent: (v: number, is_hovering: boolean) => void
    onPress: (v: number, e: MouseEvent) => void
}

export const CellGrid: React.FC<CellGridProps> = (props: CellGridProps) => {

    let data: JSX.Element[] = []

    let temp = horizontalBorder(props.board.cornerCells[0], props.board.cornerCells[1]);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    for (let x = 0; x < Board.height; x++) {

        let temp = [<CellWidget value={Cell.Border} />];
        for (let y = 0; y < Board.width; y++) {

            let cell_widget = <CellWidget value={props.board.get(x, y)} />

            if (props.ids_to_replace != null) {
                let shapeCellId = props.ids_to_replace.indexOf(x * Board.height + y)
                if (props.highlightShape != null && shapeCellId != -1) {
                    cell_widget = <CellWidget highlight={props.errors[shapeCellId]} value={props.cells[shapeCellId]} />
                }
            }

            temp.push(
                <SelectableCell
                    key={uuidv4()}
                    cellPosition={x * Board.height + y}
                    onHoverEvent={props.onHoverEvent}
                    onPress={props.onPress}>
                    {cell_widget}
                </SelectableCell>
            );
        }
        temp.push(<CellWidget value={Cell.Border} />);
        data.push(<div key={uuidv4()} className='row'>{temp}</div>);
    }
    // add bottom border
    temp = horizontalBorder(props.board.cornerCells[3], props.board.cornerCells[2]);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    return <div id="cellGrid" className='column'> {data}</div>

}


