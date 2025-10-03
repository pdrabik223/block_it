import type { Shape } from '../engine/Shape';
import { CellWidget } from './CellWidget';
import type { JSX } from 'react';
import './ShapeWidget.css'
// import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ShapeWidgetProps { shape: Shape }
export const ShapeWidget: React.FC<ShapeWidgetProps> = (props: ShapeWidgetProps) => {

    // const [isSelected, setIsSelected] = useState(false);

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

    return <div className='shape' onClick={(e) => {
        if (e.type === 'click') {
            console.log('Left click');
        } else if (e.type === 'contextmenu') {
            console.log('Right click');
        }
    }} onDoubleClick={() => alert("Double click")}>
        <div className='column'> {data} </div>
    </div>
}

