
import './BoardWidget.css'
import type { JSX } from 'react';
import { Shape } from '../engine/Shape.tsx';

import { CellWidget } from './CellWidget.tsx';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";

import { FullScreenOverlay } from './FullScreenOverlay.tsx';
import { RadialToolTip } from './RadialToolTip.tsx';
import { SelectableCell } from './SelectableCell.tsx';
import { Cell, PlacementState } from '../engine/enum_definitions.tsx';
import { Board } from '../engine/Board.tsx';


export interface BoardWidgetProps {
    board: Board,
    highlight?: number,
    highlightShape?: Shape,
    onMoveMade: () => void

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

    let applyFunction = undefined;
    if (props.highlightShape && shapePlacement != -1)
        if (props.board.isValidPlacement(errors))
            applyFunction = () => {
                props.board.addShape(shapePlacement, props.highlightShape!)
                setReDrawWidget(!reDrawWidget);
                // checkIfPLayerWon(shapes) TODO maybe refresh shapes 
                setTooltipPos(null);
                props.onMoveMade();
            }

    return <div>
        <CellGrid
            board={props.board}
            ids_to_replace={ids_to_replace}
            cells={cells}
            errors={errors}
            highlightShape={props.highlightShape}
            onHoverEvent={(v, b) => { if (b) { if (shapePlacement != v) setShapePlacement(v) } else { if (shapePlacement == v) setShapePlacement(-1) } }}
            onPress={(_, e) => { setTooltipPos({ x: e.clientX, y: e.clientY }); }}
        />
        <FullScreenOverlay show={tooltipPos != null && props.highlightShape != undefined} >
            <RadialToolTip apply={applyFunction} refreshBoard={() => { setReDrawWidget(!reDrawWidget); }} highlightShape={props.highlightShape} onOutsideTap={() => setTooltipPos(null)} position={tooltipPos!} />
        </FullScreenOverlay>
    </div>
}

function horizontalBorder(left_cell: Cell, right_cell: Cell): JSX.Element[] {

    let temp = [<CellWidget value={left_cell} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={right_cell} />)
    return temp;
}

interface CellGridProps {
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

    let temp = horizontalBorder(Cell.Red, Cell.Blue);
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
    temp = horizontalBorder(Cell.Orange, Cell.Green);
    data.push(<div key={uuidv4()} className='row'>{temp}</div>);

    return <div className='column'> {data}</div>

}


