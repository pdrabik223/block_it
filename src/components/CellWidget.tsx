import { Cell } from "../engine/engine"
import './CellWidget.css'

interface CellWidgetProps { value: Cell }


export const CellWidget: React.FC<CellWidgetProps> = (props: CellWidgetProps) => {
    switch (props.value) {
        case Cell.Blue:
            return <div className='cell_base cell_blue'> </div>
        case Cell.Green:
            return <div className='cell_base cell_green'> </div>
        case Cell.Orange:
            return <div className='cell_base cell_orange'> </div>
        case Cell.Red:
            return <div className='cell_base cell_red'> </div>
        case Cell.Empty:
            return <div className='cell_base cell_empty'> </div>

        case Cell.Border:
            return <div className='cell_base cell_border'> </div>
        case Cell.None:
            return <div className='cell_base cell_none'> </div>

    }
}

