import type React from 'react';

import "./RadialToolTip.css"
import { NoRotations, type Shape } from '../engine/Shape.tsx';
import { Button } from './Button.tsx';


export interface RadialToolTipProps {

    position: { x: number, y: number },
    highlightShape?: Shape,
    apply?: () => void
    cancelShape?: () => void
    onOutsideTap: () => void
    refreshBoard: () => void
    onShapeCancel?: () => void
}


export const RadialToolTip: React.FC<RadialToolTipProps> = (props: RadialToolTipProps) => {

    function getRotateRButton() {

        if (props.highlightShape && props.highlightShape.numberOfRotations != NoRotations.Zero)
            return <Button
                onClick={() => {
                    props.highlightShape!.rotate(true);
                    props.refreshBoard();
                }}
                style={{
                    zIndex: 10,
                    position: 'absolute',
                    left: "60%",
                    top: "15%",
                }}>Rotate R</Button>
    }
    function getFlipButton() {
        if (props.highlightShape)
            return <Button
                onClick={
                    () => {
                        props.highlightShape!.flipLR();
                        props.refreshBoard();
                    }
                }
                style={{
                    position: 'absolute',
                    left: "42%",
                    top: "10%",
                }}>Flip</Button>
    }

    function getVerticalFlipButton() {
        if (props.highlightShape)
            return <Button
                onClick={
                    () => {
                        props.highlightShape!.flipLR();
                        props.highlightShape!.rotate(true);
                        props.highlightShape!.rotate(true);
                        props.refreshBoard();
                    }
                }
                style={{
                    position: 'absolute',
                    left: "12%",
                    top: "45%",
                }}>Flip</Button>
    }

    function getRotateLButton() {
        if (props.highlightShape && props.highlightShape.numberOfRotations != NoRotations.Zero)
            return <Button
                onClick={() => {
                    props.highlightShape!.rotate(false);
                    props.refreshBoard();
                }}
                style={{
                    position: 'absolute',
                    left: "14%",
                    top: "15%",
                }}>Rotate L</Button>
    }
    function getApplyButton() {
        if (props.apply != undefined)
            return <Button
                onClick={props.apply}

                style={{
                    position: 'absolute',
                    left: "40%",
                    top: "75%",
                }}>Apply</Button>

    }
    return <div style={{
        position: 'absolute',
        left: `${props.position.x}px`, top: `${props.position.y}px`,
        height: '400px',
        width: '400px',
        zIndex: 10
    }}>
        <div style={{
            left: "-50%",
            top: "-50%",
            height: "100%",
            width: "100%",
            borderRadius: '50%',
            border: '2px solid rgb(127, 127, 127)',
            position: "absolute",
        }} >
            {getRotateRButton()}
            {getFlipButton()}
            {getRotateLButton()}
            {getApplyButton()}
            {getVerticalFlipButton()}

            <Button
                onClick={() => { if (props.onShapeCancel != undefined) props.onShapeCancel(); props.onOutsideTap() }}
                style={{
                    position: `absolute`,
                    left: "60%",
                    top: "60%",

                }}>Cancel Shape</Button>


        </div>
        <div className='button_dir'
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
                cursor: 'pointer',
                borderRadius: '50%',
                border: '2px solid rgb(127, 127, 127)',
                position: "absolute",

            }}
        >Close</div>
    </div >;
};

