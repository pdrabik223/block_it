import { useState } from 'react';
import { CellGrid } from './components/CellGrid.tsx';
import { Row } from './components/Row.tsx';
import { Board } from './engine/Board.tsx';
import { Cell } from './engine/enum_definitions.tsx';
import randy from './engine/randy.tsx';
import { shapeList, Shape } from './engine/Shape.tsx';

export interface BackGroundProps {

    show?: boolean
}


export const BackGround: React.FC<BackGroundProps> = (props: BackGroundProps) => {

    const [board] = useState<Board>(new Board());

    let show = props.show != undefined ? props.show : true;

    if (!show) return <></>;

    function initShapeList(cell: Cell) {
        let list = [];
        for (let shape of shapeList())
            list.push(new Shape(shape, cell));
        return list;
    }

    let colors = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange];

    function generateBoard() {

        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        let shapes: Shape[] = initShapeList(randomColor);

        let move = randy(board, shapes);
        while (move != null) {
            board.makeMove(move);
            move = randy(board, shapes);
        }

    }

    generateBoard();

    return <Row className={'backGround'} style={{
        zIndex: "-2", position: "absolute", height: "100%", width: "100%",
        left: "0", top: "0px", bottom: "0px", flexWrap: "wrap", overflow: 'hidden'
        , filter: 'brightness(0.5)'
    }}>

        <CellGrid showBorder={false} board={board} cells={[]} errors={[]} cellSize={80}></CellGrid>

    </Row>;
};
