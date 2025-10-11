
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


    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""


    return <button
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={props.style}>{props.children}</button>
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


interface IconButtonProps {
    src?: string | undefined,
    onClick: () => void,
    style?: React.CSSProperties,
}

export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {


    let textColors = ['icon_button_red', 'icon_button_blue', 'icon_button_green', 'icon_button_orange']

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    let className = hover ? textColors[Math.floor(Math.random() * textColors.length)] : ""

    return <img        
        className={className}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src={props.src} alt="logo" 
        style={props.style} />


}