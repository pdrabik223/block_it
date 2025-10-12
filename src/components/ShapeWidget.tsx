import type { Shape } from '../engine/Shape.tsx';
import { CellWidget } from './CellWidget.tsx';
import type { JSX } from 'react';
import './ShapeWidget.css'
import { v4 as uuidv4 } from 'uuid';
import { globalSettingsState } from '../App.tsx';


interface ShapeWidgetProps { shape: Shape }
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
        data.push(<div key={uuidv4()} className='row'>{temp}</div>);
    }

    return <div key={uuidv4()} className='column'> {data} </div>

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