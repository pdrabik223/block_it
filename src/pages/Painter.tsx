
import { Button, ButtonState, StateButton } from '../components/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Board } from '../engine/Board.tsx';
import { Cell, cellBlue, cellEmpty, cellGreen, cellOrange, cellRed } from '../engine/enum_definitions.tsx';
import { Shape, shapeList } from '../engine/Shape.tsx';
import { BoardWidget } from '../components/BoardWidget.tsx';
import { ShapeListWidget } from '../components/ShapeListWidget.tsx';

import * as htmlToImage from 'html-to-image';
import { saveAs } from "file-saver";
import { Column } from '../components/Column.tsx';
import { ShapeList } from '../engine/ShapeList.tsx';


interface PainterProps {
    setShowBackground: (val: boolean) => void
}


export const Painter: React.FC<PainterProps> = (props: PainterProps) => {

    let navigate = useNavigate();
    const [removeShapeAfterPlacement, setRemoveShapeAfterPlacement] = useState(false)
    const [paintSymmetrically] = useState(false)
    const [inPainterMode, setInPainterMode] = useState(false)
    const [requireLegalPosition, setRequireLegalPositions] = useState(true)

    if (inPainterMode) {
        props.setShowBackground(false)
        return <PaintLoop navigateHome={() => navigate("/block_it/")} removeShapeAfterPlacement={removeShapeAfterPlacement} paintSymmetrically={paintSymmetrically} requireLegalPositions={requireLegalPosition} />
    }
    props.setShowBackground(true)
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


function initShapeList(cell: Cell, noDuplicates: number = 1) {
    let list = []
    for (let shape of shapeList())
        for (let x = 0; x < noDuplicates; x++)
            list.push(new Shape(shape, cell))
    return list
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
    const [board] = useState(new Board());
    const [shapes] = useState(initShapes());
    const [moveCounter, setMoveCounter] = useState(0);

    function onMoveMade() {

        if (props.removeShapeAfterPlacement && selected != -1) {
            shapes[selectedColor % 5].remove(selected);
        }
        setMoveCounter(moveCounter + 1)
    }

    function getHighlightedShape() {
        return (selected != -1) ? shapes[selectedColor % 5].get(selected) : undefined
    }

    function getImage() {
        var node = document.getElementById('cellGrid');

        htmlToImage.toPng(node!)
            .then(function (dataUrl) {
                saveAs(dataUrl, "BlockIt.png");
            });
    }
    let textColors = [cellRed, cellBlue, cellGreen, cellOrange, cellEmpty]

    return <>
        <h1 style={{ backgroundColor: "transparent", color: textColors[selectedColor % 5] }}>Painter</h1>

        <Button onClick={() => setSelectedColor(selectedColor + 3)} style={{ margin: "1%" }}> Previous Color </Button>
        <Button onClick={() => props.navigateHome()} style={{ margin: "1%" }}> Exit </Button>
        <Button onClick={() => setSelectedColor(4)} style={{ margin: "1%" }}> Eraser </Button>
        <Button onClick={() => getImage()} style={{ margin: "1%" }}> Save </Button>
        <Button onClick={() => setSelectedColor(selectedColor + 1)} style={{ margin: "1%" }}> Next Color </Button>

        <BoardWidget validateBeforePlacement={props.requireLegalPositions} onShapeCancel={() => setSelected(-1)} onMoveMade={() => onMoveMade()} board={board} highlightShape={getHighlightedShape()} />
        <ShapeListWidget shapes={shapes[selectedColor % 5]} onPress={setSelected} lockSelection={false} selected={selected} />

    </>
}