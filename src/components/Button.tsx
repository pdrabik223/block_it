import React, { useState } from "react"

export const cellRed: string = "rgb(255, 86, 86)"
export const cellBlue: string = "rgb(59, 59, 253)"
export const cellGreen: string = "rgb(43, 129, 43)"
export const cellOrange: string = "rgb(249,195,96)"

export const cellColors = [cellRed,
    cellBlue,
    cellGreen,
    cellOrange]
function getRandomRGBColor() {
    return cellColors[Math.floor(Math.random() * cellColors.length)]
}

interface ButtonProps {
    onClick?: () => void,
    children?: React.ReactNode,
    style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let color = hover ? getRandomRGBColor() : "transparent"

    return <button
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={(() => {
            const baseStyle: React.CSSProperties = {
                borderColor: color
            };

            return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
        })()}>{props.children}</button>
}

export class ButtonState {
    public label: React.ReactNode
    public value: any
    constructor(label: React.ReactNode, value: any) {
        this.label = label
        this.value = value
    }
}

interface StateButtonProps {
    style?: React.CSSProperties,
    onClick: (value: any) => void
    buttonStates: ButtonState[]
    initialValue: any
}

function findIndex(value: any, buttonStates: ButtonState[]) {

    for (let i = 0; i < buttonStates.length; i++) {
        if (buttonStates[i].value == value) return i;
    }
    return 0;
}

export const StateButton: React.FC<StateButtonProps> = (props: StateButtonProps) => {

    const [stateIndex, setStateIndex] = useState(findIndex(props.initialValue, props.buttonStates))

    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let color = hover ? getRandomRGBColor() : ""

    return <button

        onClick={() => {
            let id = (stateIndex + 1) % props.buttonStates.length
            setStateIndex(id);
            props.onClick(props.buttonStates[id].value)
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={(() => {
            const baseStyle: React.CSSProperties = {
                borderColor: color
            };

            return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
        })()}>{props.buttonStates[stateIndex].label}</button>
}

interface TitleButtonProps {
    text: string, onClick: () => void, style?: React.CSSProperties,
}

export const TitleButton: React.FC<TitleButtonProps> = (props: TitleButtonProps) => {



    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let color = hover ? getRandomRGBColor() : ""


    return <h2
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={(() => {
            const baseStyle: React.CSSProperties = {
                color: color,
                cursor: "pointer",
            };

            return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
        })()}>{props.text}</h2>

}

interface IconButtonProps {
    children?: React.ReactNode,
    onClick: () => void, style?: React.CSSProperties,

}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let color = hover ? getRandomRGBColor() : ""

    return <div

        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={(() => {
            const baseStyle: React.CSSProperties = {
                cursor: "pointer",
                color: color
            };

            return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
        })()}
        
        >
        {props.children}

    </div>


}