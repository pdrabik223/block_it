import { useState } from "react"
import { Button } from "../components/Button.tsx"
import { Row } from "../components/Row.tsx"
import { Column } from "../components/Column.tsx"
import { ShapeList } from "../engine/ShapeList.tsx"
import type { Shape } from "../engine/Shape.tsx"
import { Cell } from "../engine/enum_definitions.tsx"
import { ShapeWidget } from "../components/ShapeWidget.tsx"
import { SelectableShape } from "../components/SelectableShape.tsx"
import { v4 as uuidv4 } from 'uuid';

interface AllShapePermutationsProps {


}

export const AllShapePermutationsProps: React.FC<AllShapePermutationsProps> = (props: AllShapePermutationsProps) => {

    const [selectedColor, setSelectedColor] = useState<number>(0)
    const [update, setUpdate] = useState(0)

    const [idsToOmmit, setIdsToOmit] = useState<number[]>([])
    // const [shapeId, setShapeID] = useState(0)
    let colors = [Cell.Red, Cell.Blue, Cell.Orange, Cell.Green]

    function onButtonClick(id: number) {
        setSelectedColor(id)
    }

    let shapes = ShapeList.GenerateShapes(colors[selectedColor % 4])

    function getPermutationRow() {
        let rows = []
        var shapeID = 0

        for (let val of shapes.data) {
            let permutations = val.getPermutations()

            rows.push(<Row expanded={true} style={{ margin: '40 px' }}>{permutations.map((val: Shape) => {

                let copy = shapeID;
                shapeID = shapeID + 1;

                let isSelected = idsToOmmit.indexOf(copy) == -1

                return <div
                    key={uuidv4()}
                    style={{ marginTop: '64px', marginLeft: '16px', marginRight: '16px' }}>
                    <SelectableShape
                        isSelected={isSelected}
                        shapeId={copy}
                        onPress={() => { idsToOmmit.push(copy), setUpdate(update + 1), console.log(idsToOmmit) }}>
                        <ShapeWidget shape={val} />
                    </SelectableShape>
                </div>
            })}
            </Row>)
        }
        return rows
    }
    function saveToFile() {
        let rows = []
        var shapeID = 0

        for (let val of shapes.data) {
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