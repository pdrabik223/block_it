
import './BoardWidget.css'
import type { JSX } from 'react';
import { Shape } from '../engine/Shape';
import { Board, Cell } from '../engine/engine';
import { CellWidget } from './CellWidget';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from "react";
import { ShapeWidget } from './ShapeWidget';


interface BoardWidgetProps {
    board: Board,
    onCellSelect: (v: number) => void
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


    let data: JSX.Element[] = []

    let temp = horizontalBorder(Cell.Red, Cell.Blue);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    for (let x = 0; x < Board.height; x++) {

        let temp = [<CellWidget value={Cell.Border} />];
        for (let y = 0; y < Board.width; y++) {
            let cell_widget;

            cell_widget = <CellWidget value={props.board.get(x, y)} />

            temp.push(
                <SelectableCell
                    cellPosition={x * Board.height + y}
                    // onHoverEvent={(v, b) => { if (b) { props.onCellSelect(v) } else setShapePlacement(-1) }}
                    onPress={(v) => props.onCellSelect(v)}>
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

    return <BoardOverlay shape={props.highlightShape}>
        <div className='column'> {data} </div>
    </BoardOverlay>
}

interface SelectableCellProps {
    children: React.ReactNode,
    onPress: (v: number) => void,
    cellPosition: number,
}

export const SelectableCell: React.FC<SelectableCellProps> = (props: SelectableCellProps) => {

    return <div
        className='selectable_cell'
        key={uuidv4()}
        onClick={() => props.onPress(props.cellPosition)}
    >
        {props.children}
    </div>
}


interface BoardOverlayInterface {
    children: React.ReactNode,
    shape?: Shape
}

function getShapePosition(
    mouse_x: number,
    mouse_y: number,
    shape_size: number,
    div_width: number
) {
    console.log(div_width)


    let square_size = 32; //px
    let board_size = 32 * 22;
    let board_x = (div_width - board_size) / 2


    let pointer_offset = (shape_size / 2) * square_size

    let x = mouse_x - pointer_offset - (square_size);
    let y = mouse_y - pointer_offset - (square_size);
    // basic bounding box
    if (x < board_x)
        x = board_x
    if (x > board_x + board_size)
        x = board_x + board_size



    return [x + 'px', y + 'px'];
}

export const BoardOverlay: React.FC<BoardOverlayInterface> = (props: BoardOverlayInterface) => {/* assuming cellSize: number 32,*/
    const [position, setPosition] = useState([0, 0]);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => { }, [ref.current]);
    let left, top;

    if (props.shape != null && ref.current != null)
        [left, top] = getShapePosition(position[0], position[1], props.shape?.size, ref.current?.offsetWidth)

    return <div
        id='overlay_size'
        onMouseMove={(event) => { setPosition([event.clientX, event.clientY]); }}
        style={{ backgroundColor: 'orange', position: "relative" }}>
        <div ref={ref}>{props.children}</div>
        {props.shape != null ? <div style={{ position: "absolute", left: left, top: top }}>
            <ShapeWidget shape={props.shape} />
        </div> : null}
    </div>


}