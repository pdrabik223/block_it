import type React from 'react';

export interface FullScreenOverlayProps {
    children: React.ReactNode,
    show: boolean
}

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = (props: FullScreenOverlayProps) => {
    if (props.show)
        return <div className='full_screen_overlay' >
            {props.children}
        </div>;
    return <></>;
};
