import type React from 'react';

import "./RadialToolTip.css"
import type { Shape } from '../engine/Shape.tsx';


export interface RadialToolTipProps {

    position: { x: number, y: number },
    highlightShape?: Shape,
    apply?: () => void
    cancelShape?: () => void
    onOutsideTap: () => void
    refreshBoard: () => void
}


export const RadialToolTip: React.FC<RadialToolTipProps> = (props: RadialToolTipProps) => {
    return <div style={{
        position: 'absolute',
        left: `${props.position.x}px`, top: `${props.position.y}px`,
        height: '400px',
        width: '400px',
        zIndex: 10
    }}>
        <div className='circle' style={{
            left: "-50%",
            top: "-50%",
            height: "100%",
            width: "100%"
        }} >
            <button
                onClick={() => {
                    if (props.highlightShape) {
                        props.highlightShape.rotate(true);
                        props.refreshBoard();
                    }

                }}
                style={{
                    zIndex: 10,
                    position: 'absolute',
                    left: "60%",
                    top: "15%",
                }}>Rotate R</button>

            <button style={{
                position: 'absolute',
                left: "42%",
                top: "10%",
            }}>Flip</button>

            <button
                onClick={() => {
                    if (props.highlightShape) {
                        props.highlightShape.rotate(false);
                        props.refreshBoard();
                    }

                }}
                style={{

                    position: 'absolute',
                    left: "14%",
                    top: "15%",
                }}>Rotate L</button>

            <button style={{
                position: `absolute`,
                left: "60%",
                top: "60%",

            }}>Cancel Shape</button>

            <button
                onClick={props.apply}

                style={{
                    position: 'absolute',
                    left: "40%",
                    top: "75%",
                }}>Apply</button>

        </div>
        <div className='circle button_dir'
            onClick={props.onOutsideTap}
            style={{
                left: "-10%", top: "-10%",
                height: "20%",
                width: "20%",
                display: 'flex',
                flex: 'auto',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                cursor: 'pointer'

            }}
        >


            Close

        </div>
    </div >;
};

