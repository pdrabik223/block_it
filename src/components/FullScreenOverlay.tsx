import type React from 'react';

export interface FullScreenOverlayProps {
    opacity?: number;
    children: React.ReactNode,
    show: boolean,
}

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = (props: FullScreenOverlayProps) => {
    let opacity = props.opacity == undefined ? 0.4 : props.opacity
    if (props.show)
        return <div className='full_screen_overlay' style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}>
            {props.children}
        </div>;
    return <></>;
};


export interface SettingsOverlayProps {
    children: React.ReactNode,
    show: boolean,
    style?: React.CSSProperties,

}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = (props: SettingsOverlayProps) => {
    if (props.show)
        return <div style={props.style
        } className='full_screen_overlay' >
            {props.children}
        </div >;
    return <></>;
};
