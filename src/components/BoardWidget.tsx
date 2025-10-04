
import './BoardWidget.css'
import type { JSX } from 'react';
import { Shape } from '../engine/Shape';
import { Board, Cell } from '../engine/engine';
import { CellWidget } from './CellWidget';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";


interface BoardWidgetProps {
    board: Board,
    highlight?: number,
    highlightShape?: Shape
}


function horizontalBorder(left_cell: Cell, right_cell: Cell): JSX.Element[] {

    let temp = [<CellWidget value={left_cell} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={right_cell} />)
    return temp;
}



function idsToReplace(shapePlacement: number, shape: Shape) {
    var ids_to_replace: number[] = []
    var cells: Cell[] = []
    let x = Math.floor(shapePlacement / Board.width);
    let y = shapePlacement % Board.width;

    switch (shape.size) {
        case 3:
        case 4:
            x -= 1;
            y -= 1;
            break;
        case 5:
            x -= 2;
            y -= 2;
            break;
    }

    for (let sx = 0; sx < shape.size; sx++) {
        for (let sy = 0; sy < shape.size; sy++) {
            if (shape.get(sx, sy) != shape.none) {
                ids_to_replace.push((x + sx) * Board.width + (sy + y))
                cells.push(shape.get(sx, sy))
            }
        }
    }
    return [ids_to_replace, cells];
}

export const BoardWidget: React.FC<BoardWidgetProps> = (props: BoardWidgetProps) => {
    const [shapePlacement, setShapePlacement] = useState<number>(-1);


    var ids_to_replace: number[] | null = null;
    var cells: Cell[] = [];

    if (props.highlightShape != null && shapePlacement != -1) {
        [ids_to_replace, cells] = idsToReplace(shapePlacement, props.highlightShape)
    }

    let data: JSX.Element[] = []

    let temp = horizontalBorder(Cell.Red, Cell.Blue);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    for (let x = 0; x < Board.height; x++) {

        let temp = [<CellWidget value={Cell.Border} />];
        for (let y = 0; y < Board.width; y++) {
            let cell_widget;

            if (ids_to_replace != null && props.highlightShape != null && ids_to_replace.indexOf(x * Board.height + y) != -1)
                cell_widget = <CellWidget value={cells[ids_to_replace.indexOf(x * Board.height + y)]} />
            else
                cell_widget = <CellWidget value={props.board.get(x, y)} />

            temp.push(
                <SelectableCell
                    cellPosition={x * Board.height + y}
                    onHoverEvent={(v, b) => { if (b) { setShapePlacement(v) } else setShapePlacement(-1) }}
                    onPress={(v) => console.log(v)}>
                    {cell_widget}
                </SelectableCell>
            );
        }
        temp.push(<CellWidget value={Cell.Border} />);
        data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    }
    // add bottom border
    temp = horizontalBorder(Cell.Orange, Cell.Green);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    return <div>
        <div className='column'> {data} </div>
    </div>
}

interface SelectableCellProps {
    children: React.ReactNode,
    onHoverEvent: (v: number, is_hovering: boolean) => void,
    onPress: (v: number) => void,
    cellPosition: number,
}

export const SelectableCell: React.FC<SelectableCellProps> = (props: SelectableCellProps) => {

    return <div
        className='selectable_cell'
        key={uuidv4()}
        onClick={() => props.onPress(props.cellPosition)}
        onMouseEnter={() => {
            props.onHoverEvent(props.cellPosition, true);

        }}
        onMouseLeave={() => {

            props.onHoverEvent(props.cellPosition, false);
        }}

    >
        {props.children}
    </div>
}
