

import { Shape } from '../engine/Shape.tsx';
import React, { useState } from "react";
import { FullScreenOverlay } from './FullScreenOverlay.tsx';
import { RadialToolTip } from './RadialToolTip.tsx';
import { Cell, PlacementState } from '../engine/enum_definitions.tsx';
import { Board } from '../engine/Board.tsx';
import { CellGrid } from './CellGrid.tsx';


export interface BoardWidgetProps {
    board: Board,
    highlight?: number,
    highlightShape?: Shape,
    onMoveMade: () => void,
    onShapeCancel?: () => void,
    validateBeforePlacement?: boolean

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

    let requireValidation = true
    if (props.validateBeforePlacement != undefined)
        requireValidation = props.validateBeforePlacement

    let applyFunction = undefined;

    if (props.highlightShape && shapePlacement != -1) {
        if (!requireValidation || props.board.isValidPlacement(errors)) {
            applyFunction = () => {
                props.board.addShape(shapePlacement, props.highlightShape!)
                setReDrawWidget(!reDrawWidget);
                // checkIfPLayerWon(shapes) TODO maybe refresh shapes 
                setTooltipPos(null);
                props.onMoveMade();
            }
        }

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
            <RadialToolTip onShapeCancel={props.onShapeCancel} apply={applyFunction} refreshBoard={() => { setReDrawWidget(!reDrawWidget); }} highlightShape={props.highlightShape} onOutsideTap={() => setTooltipPos(null)} position={tooltipPos!} />
        </FullScreenOverlay>
    </div>
}

