import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Row } from "../components/Row.tsx"
import { Column } from "../components/Column.tsx"
import { ShapeList } from "../engine/ShapeList.tsx"
import type { Shape } from "../engine/Shape.tsx"
import { Cell, cellBlue, cellGreen, cellOrange, cellRed } from "../engine/enum_definitions.tsx"
import { ShapeWidget } from "../components/ShapeWidget.tsx"
import { SelectableShape } from "../components/SelectableShape.tsx"
import { v4 as uuidv4 } from 'uuid';
import { shapeNameList } from "../engine/shapeDefinitions.tsx"


export const AllShapePermutationsProps: React.FC<{}> = () => {

    const [selectedColor, setSelectedColor] = useState<number>(0)
    const [update, setUpdate] = useState(0)
    const [idsToOmmit] = useState<number[]>([])

    let colors = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange]
    let textColors = [cellRed, cellBlue, cellGreen, cellOrange]


    function onButtonClick(id: number) {
        setSelectedColor(id)
    }

    let shapes = ShapeList.GenerateShapes(colors[selectedColor % 4])

    function countUniquePermutations() {
        let count = 0;

        for (let val of shapes.getAllShapes())
            count += val.getPermutations().length

        return count
    }

    function getPermutationRow() {
        let rows = []
        let shapeID = 0

        for (let val of shapes.getAllShapes()) {

            rows.push(<Row key={uuidv4()}>
                <div>
                    <h1>{shapeNameList()[val.shapeName]}</h1>
                    <h3>Points: {val.cellValue}</h3>
                </div></Row>)

            let rowComponents = []

            for (let permutation of val.getPermutations()) {

                let copy = shapeID;
                shapeID = shapeID + 1;

                let isSelected = idsToOmmit.indexOf(copy) == -1

                rowComponents.push(<div
                    key={uuidv4()}
                    style={{ marginTop: '32px', marginBottom: '32px', marginLeft: '16px', marginRight: '16px' }}>
                    <SelectableShape
                        isSelected={isSelected}
                        shapeId={copy}
                        onPress={() => { idsToOmmit.push(copy), setUpdate(update + 1) }}>
                        <ShapeWidget shape={permutation} />
                    </SelectableShape>
                </div>)


            }
            rows.push(<Row key={uuidv4()} expanded={true} style={{ margin: '40 px' }}> {rowComponents} </Row>)
        }
        return rows
    }
    function saveToFile() {
        let rows = []
        var shapeID = 0

        for (let val of shapes.getAllShapes()) {
            let permutations = val.getPermutations()

            rows.push(
                permutations.map((val: Shape) => {
                    let copy = shapeID;
                    shapeID = shapeID + 1;
                    let isSelected = idsToOmmit.indexOf(copy) == -1
                    if (isSelected) return val.data
                })
            )
        }
        console.log(JSON.stringify(rows))
    }

    return <Column expanded={true}>
        <div style={{ height: '80px' }}></div>
        <h1 style={{ color: `${textColors[selectedColor]}` }}>All shapes list</h1>
        <h3>Number of all shapes: {shapes.getAllShapes().length}, number of unique permutations: {countUniquePermutations()}</h3>
        <Row>
            <Button style={{ margin: '4px' }} onClick={() => onButtonClick(0)}>Red</Button>
            <Button style={{ margin: '4px' }} onClick={() => onButtonClick(1)}>Blue</Button>
            <Button style={{ margin: '4px' }} onClick={() => onButtonClick(2)}>Green</Button>
            <Button style={{ margin: '4px' }} onClick={() => onButtonClick(3)}>Orange</Button>
            <Button style={{ margin: '4px' }} onClick={() => saveToFile()}>save</Button>
        </Row>

        {getPermutationRow()}

    </Column>

} 