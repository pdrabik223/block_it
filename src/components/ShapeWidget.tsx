import type { Shape } from '../engine/Shape.tsx';
import { CellWidget } from './CellWidget.tsx';
import type { JSX } from 'react';
import './ShapeWidget.css'
import { v4 as uuidv4 } from 'uuid';
import { globalSettingsState } from '../App.tsx';
import { Row } from './Row.tsx';
import { Column } from './Column.tsx';
import { cellEmpty } from '../engine/enum_definitions.tsx';


interface ShapeWidgetProps {
    shape: Shape,
    noRepeats?: number,

}
export const ShapeWidget: React.FC<ShapeWidgetProps> = (props: ShapeWidgetProps) => {

    let data: JSX.Element[] = []


    let rows: number[] = []
    let columns: number[] = []

    if (globalSettingsState.condenseShapes) {
        for (let x = 0; x < props.shape.size; x++) {
            for (let y = 0; y < props.shape.size; y++) {
                if (props.shape.get(x, y) != props.shape.none) {
                    rows.push(x)
                    columns.push(y)
                }
            }

        }
        rows = rows.filter((item,
            index) => rows.indexOf(item) === index);

        BubbleSort(rows)

        columns = columns.filter((item,
            index) => columns.indexOf(item) === index);

        BubbleSort(columns)
    } else {
        for (let x = 0; x < props.shape.size; x++) { rows.push(x) }
        for (let y = 0; y < props.shape.size; y++) { columns.push(y) }
    }

    for (let x of rows) {

        let temp = [];
        for (let y of columns) {

            temp.push(
                <CellWidget value={props.shape.get(x, y)} />
            );
        }
        data.push(<Row key={uuidv4()} >{temp}</Row>);
    }
    let repeats = props.noRepeats != undefined ? props.noRepeats : 1

    if (repeats == 1)
        return <Column key={uuidv4()} > {data} </Column>
    else
        return <div >
            <div style={{ backgroundColor: cellEmpty }}>
                <span style={{
                    position: 'fixed', top: '0px', right: "-5px",
                    userSelect: 'none', fontWeight: "bold",
                    fontSize: "x-large", backgroundColor: cellEmpty,
                    borderRadius: '50%', width: '30px',
                    height: '30px',
                    lineHeight: '30px'
                }}>{repeats}</span >
            </div>
            <Column key={uuidv4()} > {data} </Column>
        </div>
}

function BubbleSort(data: number[]) {
    for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
            if (data[j] < data[i]) {
                let temp = data[j]
                data[j] = data[i]
                data[i] = temp
            }
        }
    }
}