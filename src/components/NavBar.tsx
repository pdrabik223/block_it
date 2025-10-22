import { IoMdSettings } from "react-icons/io";

import { useNavigate } from "react-router";
import { useState } from "react";
import { IconButton, TitleButton } from "./Button.tsx";
import { TopBanner } from "../TopBanner.tsx";
import { FullScreenOverlay } from "./FullScreenOverlay.tsx";
import { globalSettingsState, setGlobalState } from "../App.tsx";
import { SettingsPage } from "../SettingsPage.tsx";


export const NavBar: React.FC<{}> = () => {
    const [showSettings, setShowSettings] = useState(false)


    let navigate = useNavigate();

    return <>
        <TopBanner
            leading={<TitleButton style={{ fontSize: 'xx-large' }} text={'Blokus'} onClick={() => navigate("/block_it/")} />}
            following={<IconButton
                onClick={() => { setShowSettings(true) }}>
                <IoMdSettings size={'50px'} />
            </IconButton>} />

        <FullScreenOverlay style={{ zIndex: 21, backgroundColor: '#242424' }} show={showSettings}>
            <SettingsPage cookies={globalSettingsState} setGlobalState={setGlobalState} onSettingsClosed={() => setShowSettings(false)} />
        </FullScreenOverlay>
    </>

}