import type { JSX } from 'react';
import { Board, Cell } from '../engine/engine';
import { CellWidget } from './CellWidget';
import './BoardWidget.css'

interface BoardWidgetProps { board: Board }

export const BoardWidget: React.FC<BoardWidgetProps> = (props: BoardWidgetProps) => {

    let data: JSX.Element[] = []
    // add top border
    let temp = [<CellWidget value={Cell.Red} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={Cell.Blue} />)
    data.push(<div className='row'>{temp}</div>);

    for (let x = 0; x < Board.height; x++) {

        let temp = [<CellWidget value={Cell.Border} />];
        for (let y = 0; y < Board.width; y++) {

            temp.push(
                <div className='selectable_cell'>
                    <CellWidget value={props.board.get(x, y)} /></div>
            );
        }
        temp.push(<CellWidget value={Cell.Border} />);
        data.push(<div className='row'>{temp}</div>);

    }
    // add bottom border
    temp = [<CellWidget value={Cell.Orange} />];
    for (let x = 0; x < Board.height; x++) {
        temp.push(<CellWidget value={Cell.Border} />);
    }
    temp.push(<CellWidget value={Cell.Green} />)
    data.push(<div className='row'>{temp}</div>);

    return <div>
        <div className='column'> {data} </div>
    </div>
}