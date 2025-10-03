import type { Shape } from '../engine/Shape';
import { CellWidget } from './CellWidget';
import type { JSX } from 'react';
import './ShapeWidget.css'

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
        data.push(<div className='row'>{temp}</div>);
    }

    return <div className='shape'>
        <div className='column'> {data} </div>
    </div>
}