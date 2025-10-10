import type { Shape } from '../engine/Shape.tsx';
import { CellWidget } from './CellWidget.tsx';
import type { JSX } from 'react';
import './ShapeWidget.css'
import { v4 as uuidv4 } from 'uuid';


interface ShapeWidgetProps { shape: Shape }
export const ShapeWidget: React.FC<ShapeWidgetProps> = (props: ShapeWidgetProps) => {

    let data: JSX.Element[] = []

    for (let x = 0; x < props.shape.size; x++) {

        let temp = [];
        for (let y = 0; y < props.shape.size; y++) {

            temp.push(
                <CellWidget value={props.shape.get(x, y)} />
            );
        }
        data.push(<div key={uuidv4()} className='row'>{temp}</div>);
    }

    return <div key={uuidv4()} className='column'> {data} </div>

}

