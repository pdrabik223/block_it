
import React, { useState, type JSX } from "react"
import "./Button.css"

interface ButtonProps {
    style?: React.CSSProperties,
    children?: React.ReactNode,
    onClick?: () => void
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    let textColors = ['fancy_button_red', 'fancy_button_blue', 'fancy_button_green', 'fancy_button_orange']

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""

    return <button
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={props.style}>{props.children}</button>
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
    // children?: React.ReactNode,
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
    let textColors = ['fancy_button_red', 'fancy_button_blue', 'fancy_button_green', 'fancy_button_orange']

    const [stateIndex, setStateIndex] = useState(findIndex(props.initialValue, props.buttonStates))

    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""


    return <button
        className={className}
        onClick={() => {
            let id = (stateIndex + 1) % props.buttonStates.length
            setStateIndex(id);
            props.onClick(props.buttonStates[id].value)
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={props.style}>{props.buttonStates[stateIndex].label}</button>
}




interface TitleButtonProps {
    text: string, onClick: () => void, style?: React.CSSProperties,
}

export const TitleButton: React.FC<TitleButtonProps> = (props: TitleButtonProps) => {


    let textColors = ['text_button_red', 'text_button_blue', 'text_button_green', 'text_button_orange']

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""


    return <h2
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={props.style}>{props.text}</h2>

}
// import { ReactSVG } from 'react-svg';

interface IconButtonProps {
    svg: JSX.Element,
    onClick: () => void,
    style?: React.CSSProperties,
    height: number,
    width: number
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {


    let textColors = ['icon_button_red', 'icon_button_blue', 'icon_button_green', 'icon_button_orange']

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""

    return <svg
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width={props.width + 'px'}
        height={props.height + 'px'}
        fill="white"
        style={props.style} >
        {props.svg}
    </svg>


}