
import React, { useState } from "react"
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

    let props_copy = props.style ? props.style! : {}

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""


    return <button
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={props_copy}>{props.children}</button>
}