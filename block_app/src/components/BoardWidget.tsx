import type { JSX } from 'react';
import { Board } from '../engine/engine';
import { CellWidget } from './CellWidget';
import './BoardWidget.css'

interface BoardWidgetProps { board: Board }

export const BoardWidget: React.FC<BoardWidgetProps> = (props: BoardWidgetProps) => {

    let data: JSX.Element[] = []

    for (let x = 0; x < Board.height; x++) {

        let temp = [];
        for (let y = 0; y < Board.width; y++) {

            temp.push(
                <div className='selectable_cell'>
                    <CellWidget value={props.board.get(x, y)} /></div>
            );
        }
        data.push(<div className='row'>{temp}</div>);
    }

    return <div className='column'> {data} </div>;

}