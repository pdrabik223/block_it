import { useState } from "react"
import { BoardWidget } from "../components/BoardWidget.tsx"
import { Button, ButtonState, StateButton } from "../components/Button.tsx"
import { ShapeListWidget } from "../components/ShapeListWidget.tsx"
import { Board } from "../engine/Board.tsx"
import { Cell } from "../engine/enum_definitions.tsx"
import { ShapeList } from "../engine/ShapeList.tsx"
import type { Shapes } from "../engine/shapeDefinitions.tsx"
import { Shape } from "../engine/Shape.tsx"
import { v4 as uuidv4 } from 'uuid';
import { advancedEnginesMap2Player, basicEnginesMap } from "./EngineGameUI.tsx"


interface TestPageProps {

}


interface BoardSnapshot {
    cells: Cell[];
    width: number;
    height: number;
    cornerCells: Cell[];
}

interface ShapeListSnapshot {
    color: Cell;
    counts: number[];
    shapes: Shapes[];
}
interface GameSnapshot {
    board: BoardSnapshot;
    shapes: ShapeListSnapshot[];
}



function initShapes() {
    return [(ShapeList.GenerateShapes(Cell.Red)),
    (ShapeList.GenerateShapes(Cell.Blue)),
    (ShapeList.GenerateShapes(Cell.Green)),
    (ShapeList.GenerateShapes(Cell.Orange)),
    (ShapeList.GenerateShapes(Cell.Empty))]
}

export const TestPage: React.FC<TestPageProps> = (props: TestPageProps) => {
    const [selectedColor, setSelectedColor] = useState(0)
    const [selected, setSelected] = useState(-1)
    const [board, setBoard] = useState(new Board());
    const [shapes, setShapes] = useState(initShapes());
    const [moveCounter, setMoveCounter] = useState(0);

    const loadSnapshot = (snapshot: GameSnapshot) => {
        console.log(snapshot)

        // Update board
        const newBoard = new Board();
        newBoard.data = snapshot.board.cells;
        newBoard.cornerCells = snapshot.board.cornerCells;
        setBoard(newBoard);

        // Update shapes
        const newShapes = snapshot.shapes.map(shapeListData => {
            const shapeList = new ShapeList();
            shapeList.color = shapeListData.color;
            shapeList.setCounts(shapeListData.counts);

            shapeListData.shapes.forEach((shapeData) => {
                const shape = new Shape(shapeData, shapeListData.color);
                shapeList.addShape(shape);
            });

            return shapeList;
        });
        setShapes(newShapes);
    };




    function onMoveMade() {
        setMoveCounter(moveCounter + 1)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("aAAAA")
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const snapshot = JSON.parse(e.target?.result as string) as GameSnapshot;
                    console.log(snapshot)
                    loadSnapshot(snapshot);
                } catch (error) {
                    console.error('Error loading snapshot:', error);
                    alert('Invalid snapshot file');
                }
            };
            reader.readAsText(file);

        }
    };

    function getHighlightedShape() {
        return (selected != -1) ? shapes[selectedColor % 5].get(selected) : undefined
    }

    function changeCornersState(mode: number) {
        if (mode == 0) {
            board.cornerCells = [Cell.Red, Cell.Red, Cell.Blue, Cell.Blue]

        } else {
            board.cornerCells = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange]
        }
        setMoveCounter(moveCounter + 2)
    }
    let EngineOptions = [];

    let engines = Array.from(basicEnginesMap.keys());
    engines = engines.concat(Array.from(advancedEnginesMap2Player.keys()))


    for (let value of engines) {
        EngineOptions.push(<option style={{ margin: "4px", fontSize: 'large' }} key={uuidv4()} value={value}>{value}</option>)
    }

    return <>
        <h1 style={{ backgroundColor: "transparent" }}>Tester</h1>
        <Button onClick={() => setSelectedColor(selectedColor + 3)} style={{ margin: "1%" }}> Previous Color </Button>
        <Button onClick={() => setSelectedColor(selectedColor + 1)} style={{ margin: "1%" }}> Next Color </Button>
        <StateButton
            initialValue={1}
            onClick={changeCornersState}
            buttonStates={
                [
                    new ButtonState('2 Player Mode', 0),
                    new ButtonState('4 Player Mode', 1),
                ]
            }>
        </StateButton>
        <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="upload-snapshot"
        />
        <Button
            onClick={() => document.getElementById('upload-snapshot')?.click()}>
            Upload Board Snapshot
        </Button>
        <Button
            onClick={() => console.log(board.getAllPossibleMovesForShapes(shapes[selectedColor % 5]))}>
            Calculate Stuff
        </Button>
        <BoardWidget validateBeforePlacement={false} onShapeCancel={() => setSelected(-1)} onMoveMade={() => onMoveMade()} board={board} highlightShape={getHighlightedShape()} />
        <ShapeListWidget shapes={shapes[selectedColor % 5]} onPress={setSelected} lockSelection={false} selected={selected} />

    </>
}
