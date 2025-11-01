import { useRef, useState } from 'react';
import { Button } from '../components/Button.tsx';
import { Cell } from '../engine/enum_definitions.tsx';
import { GameLoop, PlayerInfo } from './GameLoop.tsx';
import { PlayerInfoBlock, type PlayerInfoRef } from '../components/PlayerInfoBlock.tsx';

import { useNavigate } from 'react-router-dom';
import { Column } from '../components/Column.tsx';
import { advancedEnginesMap2Player, basicEnginesMap } from './EngineGameUI.tsx';
import { BackGround } from '../BackGround.tsx';

export const Game2Player: React.FC<{}> = () => {

    const [playerInfo] = useState<Array<PlayerInfo>>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    let navigate = useNavigate();

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    const handleClick = () => {
        playerInfo.splice(0, playerInfo.length)
        for (let i = 0; i < 2; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };
    let engines = Array.from(basicEnginesMap.keys());
    engines = engines.concat(Array.from(advancedEnginesMap2Player.keys()))

    return <Column>
        <h1>2 Player Mode</h1>
        <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} values={engines} />
        <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} values={engines} />

        <Button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</Button>
        <Button style={{ margin: "4px" }} onClick={() => navigate("/block_it/")}>Back</Button>
    </Column>
}


export const Game4Player: React.FC<{}> = () => {

    const [playerInfo] = useState<Array<PlayerInfo>>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    let navigate = useNavigate();

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        
        return <GameLoop returnToMainMenu={() => { setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    const handleClick = () => {
        playerInfo.splice(0, playerInfo.length)
        for (let i = 0; i < 4; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };
    
    let engines = Array.from(basicEnginesMap.keys());


    return <Column>
        <h1>4 Player Mode</h1>

        <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} values={engines} />
        <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} values={engines} />
        <PlayerInfoBlock ref={inputRefs[2]} cell={Cell.Green} values={engines} />
        <PlayerInfoBlock ref={inputRefs[3]} cell={Cell.Orange} values={engines} />

        <Button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</Button>
        <Button style={{ margin: "4px" }} onClick={() => navigate("/block_it/")}>Back</Button>
    </Column>
}
interface MainMenuProps {
    setShowBackground: (val: boolean) => void
}
export const MainMenu: React.FC<{}> = () => {

    let navigate = useNavigate();
    return <div>
        <BackGround show={true} />
        <Column expanded={true} style={{ width: "200px" }}>
            <h1>{randomTitle()}</h1>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/tutorial")}>Tutorial</Button>

            <Button style={{ margin: "4px" }} onClick={() => navigate("/game_2_player")}>2 Player Mode</Button>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/game_4_player")}>4 Player Mode</Button>

            <Button style={{ margin: "4px" }} onClick={() => navigate("/painter")}>Painter</Button>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/shapes")}>List of All Shapes</Button>

        </Column>
    </div>

};

const blokusTranslations = [
    "Blokus",
    "Блокус",
    "布洛克斯",
    "ブロックス",
    "블로커스",
    "بلوكوس",
    "ब्लोकस",
    "ব্লোকাস",
    "بلوکس",
    "Μπλόκους",
    "Blokusz",
    "בלוקוס",
    "โบลคัส",
    "ብሎከስ",
    "بلوکوس",
    "బ్లోకస్",
    "ಬ್ಲೋಕಸ್",
    "ബ്ലോകസ്",
    "බ්ලොකස්",
    "Blokusas"
];

function randomTitle() {
    return blokusTranslations[Math.floor(Math.random() * blokusTranslations.length)]

}