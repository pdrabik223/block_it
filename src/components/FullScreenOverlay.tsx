import type React from 'react';



export interface FullScreenOverlayProps {
    children: React.ReactNode,
    show: boolean,
    opacity?: number;
    key?: React.Key | null,
    style?: React.CSSProperties
    id?: string
}

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = (props: FullScreenOverlayProps) => {

    let backgroundColor = `rgba(0, 0, 0, ${props.opacity != undefined ? props.opacity : 0.4})`

    if (props.show)
        return <div
            id={props.id}
            key={props.key}
            style={
                (() => {
                    const baseStyle: React.CSSProperties = {
                        height: "100%",
                        width: "100%",
                        position: "fixed",
                        zIndex: 9,
                        left: 0,
                        top: 0,
                        backgroundColor: backgroundColor,
                        overflowX: "hidden"
                    };

                    return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
                })()}>
            {props.children}
        </div >;
    return <></>;
};
