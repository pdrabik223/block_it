
import './BoardWidget.css'
import type { JSX } from 'react';
import { Shape } from '../engine/Shape.tsx';
import { Board, Cell, PlacementState } from '../engine/engine.tsx';
import { CellWidget } from './CellWidget.tsx';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";

import { FullScreenOverlay } from './FullScreenOverlay.tsx';
import { RadialToolTip } from './RadialToolTip.tsx';


interface BoardWidgetProps {
    board: Board,
    highlight?: number,
    highlightShape?: Shape,
    refreshShapes: () => void,
    onMoveMade: () => void

}

function horizontalBorder(left_cell: Cell, right_cell: Cell): JSX.Element[] {

    let temp = [<CellWidget value={left_cell} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={right_cell} />)
    return temp;
}

export const BoardWidget: React.FC<BoardWidgetProps> = (props: BoardWidgetProps) => {
    const [shapePlacement, setShapePlacement] = useState<number>(-1);
    const [tooltipPos, setTooltipPos] = useState<{ x: number, y: number } | null>(null);
    const [reDrawWidget, setReDrawWidget] = useState(false)

    var ids_to_replace: number[] | null = null;
    var cells: Cell[] = [];
    var errors: PlacementState[] = [];

    if (props.highlightShape != null && shapePlacement != -1) {
        [ids_to_replace, cells, errors] = props.board.combineShape(shapePlacement, props.highlightShape)
    }

    let data: JSX.Element[] = []

    let temp = horizontalBorder(Cell.Red, Cell.Blue);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    for (let x = 0; x < Board.height; x++) {

        let temp = [<CellWidget value={Cell.Border} />];
        for (let y = 0; y < Board.width; y++) {

            let cell_widget = <CellWidget value={props.board.get(x, y)} />

            if (ids_to_replace != null) {
                let shapeCellId = ids_to_replace.indexOf(x * Board.height + y)
                if (props.highlightShape != null && shapeCellId != -1) {
                    cell_widget = <CellWidget highlight={errors[shapeCellId]} value={cells[shapeCellId]} />
                }
            }

            temp.push(
                <SelectableCell
                    cellPosition={x * Board.height + y}
                    onHoverEvent={(v, b) => { if (b) { if (shapePlacement != v) setShapePlacement(v) } else { if (shapePlacement == v) setShapePlacement(-1) } }}
                    onPress={(v, e) => { setTooltipPos({ x: e.clientX, y: e.clientY }); }}>
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


    let applyFunction = undefined;
    if (props.highlightShape && shapePlacement != -1)
        if (props.board.isValidPlacement(errors))
            applyFunction = () => {
                props.board.addShape(shapePlacement, props.highlightShape!)
                setReDrawWidget(!reDrawWidget);
                props.refreshShapes();
                setTooltipPos(null);
                props.onMoveMade();

            }

    return <div>
        <div className='column'> {data}</div>
        <FullScreenOverlay show={tooltipPos != null} >
            <RadialToolTip apply={applyFunction} refreshBoard={() => { setReDrawWidget(!reDrawWidget); props.refreshShapes() }} highlightShape={props.highlightShape} onOutsideTap={() => setTooltipPos(null)} position={tooltipPos!} />
        </FullScreenOverlay>
    </div>
}



interface SelectableCellProps {
    children: React.ReactNode,
    onHoverEvent: (v: number, is_hovering: boolean) => void,
    // onPress receives the cell position and the original MouseEvent
    onPress: (v: number, e: MouseEvent) => void,
    cellPosition: number,
}

export const SelectableCell: React.FC<SelectableCellProps> = (props: SelectableCellProps) => {

    return <div
        className='selectable_cell'
        key={uuidv4()}
        onClick={(e) => props.onPress(props.cellPosition, e.nativeEvent as MouseEvent)}
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
