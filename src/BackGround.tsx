import { useEffect, useState } from 'react';
import { CellGrid } from './components/CellGrid.tsx';
import { Row } from './components/Row.tsx';
import { Board } from './engine/Board.tsx';
import { Cell } from './engine/enum_definitions.tsx';
import randy from './engine/randy.tsx';
import { ShapeList } from './engine/ShapeList.tsx';

export interface BackGroundProps {

    show?: boolean
}


export const BackGround: React.FC<BackGroundProps> = (props: BackGroundProps) => {

    const [board] = useState<Board>(new Board());
    const [screenSize, setScreenSize] = useState<[number, number]>([window.innerHeight, window.innerWidth]);

    let show = props.show != undefined ? props.show : true;

    if (!show) return <></>;

    let colors = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange];

    function generateBoard() {

        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        let shapes: ShapeList = ShapeList.GenerateShapes(randomColor);

        let move = randy(board, shapes);
        while (move != null) {
            board.makeMove(move);
            move = randy(board, shapes);
        }

    }

    generateBoard();

    useEffect(() => {
        const handleResize = () => { setScreenSize([window.innerHeight, window.innerWidth]) };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let cellSize = Math.floor(screenSize[0] / Board.width) + 1

    return <Row className={'backGround'} style={{
        zIndex: "-2", position: "absolute", height: "100%", width: "100%",
        left: "0", top: "0px", bottom: "0px", flexWrap: "wrap", overflow: 'hidden'
        , filter: 'brightness(0.5)'
    }}>
        <div>
            <CellGrid showBorder={false} board={board} cells={[]} errors={[]} cellSize={cellSize}></CellGrid>
        </div>
    </Row>;
};
