import type React from 'react';

import "./RadialToolTip.css"


export interface RadialToolTipProps {
    children: React.ReactNode,
    position: { x: number, y: number },
    rotate?: (rotateR: boolean) => void
    flip?: () => void
    apply?: () => void
    cancelShape?: () => void
}


export const RadialToolTip: React.FC<RadialToolTipProps> = (props: RadialToolTipProps) => {
    return <div style={{
        position: 'absolute',
        left: props.position.x + 'px', top: props.position.y + 'px',
        height: '400px',
        width: '400px',
    }}>
        <div className='circle' style={{
            left: "-50%",
            top: "-50%",
            height: "100%",
            width: "100%"
        }} >

            <button style={{
                position: 'absolute',
                left: "60%",
                top: "15%",

            }}>Rotate R</button>

            <button style={{
                position: 'absolute',
                left: "42%",
                top: "10%",
            }}>Flip</button>

            <button style={{
                position: 'absolute',
                left: "14%",
                top: "15%",
            }}>Rotate L</button>

            <button style={{
                position: 'absolute',
                left: "60%",
                top: "60%",

            }}>Cancel Shape</button>

            <button style={{
                position: 'absolute',
                left: "40%",
                top: "75%",
            }}>Apply</button>

        </div>
        <div className='circle' style={{
            left: "-10%", top: "-10%",
            height: "20%",
            width: "20%"
        }} >

        </div>
    </div>;
};

