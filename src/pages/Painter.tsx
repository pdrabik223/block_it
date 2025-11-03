
import { Button, ButtonState, StateButton } from '../components/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Board } from '../engine/Board.tsx';
import { Cell, cellBlue, cellEmpty, cellGreen, cellOrange, cellRed } from '../engine/enum_definitions.tsx';
import { BoardWidget } from '../components/BoardWidget.tsx';
import { ShapeListWidget } from '../components/ShapeListWidget.tsx';

import * as htmlToImage from 'html-to-image';
import { saveAs } from "file-saver";
import { Column } from '../components/Column.tsx';
import { ShapeList } from '../engine/ShapeList.tsx';
import { FullScreenOverlay } from '../components/FullScreenOverlay.tsx';
import { Row } from '../components/Row.tsx';
import { Shape } from '../engine/Shape.tsx';
import type { Shapes } from '../engine/shapeDefinitions.tsx';

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


export const Painter: React.FC<{}> = () => {

    let navigate = useNavigate();
    const [removeShapeAfterPlacement, setRemoveShapeAfterPlacement] = useState(false)
    const [paintSymmetrically] = useState(false)
    const [inPainterMode, setInPainterMode] = useState(false)
    const [requireLegalPosition, setRequireLegalPositions] = useState(true)

    if (inPainterMode) {
        return <PaintLoop navigateHome={() => navigate("/block_it/")} removeShapeAfterPlacement={removeShapeAfterPlacement} paintSymmetrically={paintSymmetrically} requireLegalPositions={requireLegalPosition} />
    }

    return <>
        <h1>Settings </h1>
        <Column>
            <StateButton
                initialValue={removeShapeAfterPlacement}
                onClick={(v) => {
                    setRemoveShapeAfterPlacement(v);
                }} buttonStates={[
                    new ButtonState('Remove Shape After Placement: On', true),
                    new ButtonState('Remove Shape After Placement: Off', false),
                ]} style={{ width: "300px", margin: "10px auto", }} />
            <StateButton
                initialValue={requireLegalPosition}
                onClick={(v) => {
                    setRequireLegalPositions(v);
                }} buttonStates={[
                    new ButtonState('Require Legal Placement: On', true),
                    new ButtonState('Require Legal Placement: Off', false),
                ]} style={{ width: "300px", margin: "10px auto", }} />

            <Button style={{ margin: "4px" }} onClick={() => { setInPainterMode(true) }}>Start</Button>
            <Button style={{ margin: "4px" }} onClick={() => { navigate("/block_it/") }}>Back</Button>
        </Column>
    </>
}

interface PaintLoopProps {
    removeShapeAfterPlacement: boolean
    paintSymmetrically: boolean
    requireLegalPositions: boolean,
    navigateHome: () => void
}



function initShapes() {
    return [(ShapeList.GenerateShapes(Cell.Red)),
    (ShapeList.GenerateShapes(Cell.Blue)),
    (ShapeList.GenerateShapes(Cell.Green)),
    (ShapeList.GenerateShapes(Cell.Orange)),
    (ShapeList.GenerateShapes(Cell.Empty))]
}

export const PaintLoop: React.FC<PaintLoopProps> = (props: PaintLoopProps) => {

    const [selected, setSelected] = useState(-1)
    const [selectedColor, setSelectedColor] = useState(0)
    const [board, setBoard] = useState(new Board());
    const [shapes, setShapes] = useState(initShapes());
    const [moveCounter, setMoveCounter] = useState(0);
    const [showDownloadSettings, setShowDownloadSettings] = useState(false);

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

        if (props.removeShapeAfterPlacement && selected != -1) {
            shapes[selectedColor % 5].remove(selected);
        }
        setMoveCounter(moveCounter + 1)
    }

    function getHighlightedShape() {
        return (selected != -1) ? shapes[selectedColor % 5].get(selected) : undefined
    }


    let textColors = [cellRed, cellBlue, cellGreen, cellOrange, cellEmpty]

    return <>
        <h1 style={{ backgroundColor: "transparent", color: textColors[selectedColor % 5] }}>Painter</h1>

        <FullScreenOverlay onOutsideClick={() => setShowDownloadSettings(!showDownloadSettings)} show={showDownloadSettings} opacity={0.8}>
            <SaveOverlay closeOverlay={() => setShowDownloadSettings(!showDownloadSettings)} board={board} shapes={shapes} onLoadSnapshot={loadSnapshot}></SaveOverlay>
        </FullScreenOverlay>

        <Button onClick={() => setSelectedColor(selectedColor + 3)} style={{ margin: "1%" }}> Previous Color </Button>
        <Button onClick={() => props.navigateHome()} style={{ margin: "1%" }}> Exit </Button>
        <Button onClick={() => setSelectedColor(4)} style={{ margin: "1%" }}> Eraser </Button>
        <Button onClick={() => setShowDownloadSettings(!showDownloadSettings)} style={{ margin: "1%" }}> Save </Button>
        <Button onClick={() => setSelectedColor(selectedColor + 1)} style={{ margin: "1%" }}> Next Color </Button>

        <BoardWidget validateBeforePlacement={props.requireLegalPositions} onShapeCancel={() => setSelected(-1)} onMoveMade={() => onMoveMade()} board={board} highlightShape={getHighlightedShape()} />
        <ShapeListWidget shapes={shapes[selectedColor % 5]} onPress={setSelected} lockSelection={false} selected={selected} />

    </>
}

interface SaveOverlayProps {
    board: Board;
    shapes: ShapeList[];
    onLoadSnapshot: (snapshot: GameSnapshot) => void;
    closeOverlay: () => void
}
export const SaveOverlay: React.FC<SaveOverlayProps> = (props: SaveOverlayProps) => {


    function getImage() {
        var node = document.getElementById('cellGrid');

        htmlToImage.toPng(node!)
            .then(function (dataUrl) {
                saveAs(dataUrl, "BlockIt.png");
            });
        props.closeOverlay()
    }

    function getShapes(data: Shape[]) {
        let resp: Shapes[] = []
        data.forEach((val) => { resp.push(val.shapeName) })
        return resp
    }

    function getShapshot() {
        const snapshot: GameSnapshot = {
            board: {
                cells: props.board.data,
                width: Board.width,
                height: Board.height,
                cornerCells: props.board.cornerCells
            },
            shapes: props.shapes.map(shapeList => ({
                color: shapeList.color,
                counts: shapeList.getCounts(),
                shapes: getShapes(shapeList.getAllShapes())
            }))
        };

        const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
        saveAs(blob, "Blokus.json");
        props.closeOverlay()
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
                    props.onLoadSnapshot(snapshot);
                } catch (error) {
                    console.error('Error loading snapshot:', error);
                    alert('Invalid snapshot file');
                }
            };
            reader.readAsText(file);
            props.closeOverlay()
        }
    };

    return <Row expanded={true}>
        <div>
            <Column expanded={true} style={{ width: "400px" }}>
                <Button onClick={() => getImage()} style={{ margin: "1%" }}> Download png </Button>
                <Button onClick={() => getShapshot()} style={{ margin: "1%" }}> Download Board Snapshot </Button>
                <div style={{ margin: "1%", width: "400px" }}>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        id="upload-snapshot"
                    />
                    <Button
                        style={{ width: "400px" }}
                        onClick={() => document.getElementById('upload-snapshot')?.click()}>
                        Upload Board Snapshot
                    </Button>
                </div>
            </Column>
        </div>
    </Row>
}