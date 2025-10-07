import { useState } from 'react';

import { GameLoop } from './components/BoardEditWidget.tsx';
import { CellWidget } from './components/CellWidget.tsx';
import { Cell } from './engine/engine.tsx';

export interface MainMenuProps { }

export enum GameModes {
    Game2player,
    Game4player
}

export const usernames = [
    "Tony Stark",
    "Bruce Wayne",
    "Harry Potter",
    "Hermione Granger",
    "Walter White",
    "Luke Skywalker",
    "Darth Vader",
    "Frodo Baggins",
    "Indiana Jones",
    "Lara Croft",
    "Peter Parker",
    "Clark Kent",
    "Diana Prince",
    "James Bond",
    "Ellen Ripley",
    "Marty McFly",
    "Rick Sanchez",
    "Geralt of Rivia"
];

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {

    const [gameMode, setGameMode] = useState<GameModes | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setGameMode(null); setIsPlaying(false); }} playerNames={["X", "Y", "Z", "A"]} />;
    }

    if (gameMode == null) return <>
        <div className='column'>
            <h1>Block it</h1>
            <button style={{ margin: "4px" }}>Tutorial</button>
            <button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game2player)}>2 Player Game</button>
            <button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game4player)}>4 Player Game</button>
        </div>
    </>;

    if (gameMode == GameModes.Game4player) return <>
        <div className='column'>
            <h1>Settings </h1>
            {playerInfoBlock(Cell.Red)}
            {playerInfoBlock(Cell.Blue)}
            {playerInfoBlock(Cell.Green)}
            {playerInfoBlock(Cell.Orange)}
            <button style={{ margin: "4px" }} onClick={() => setIsPlaying(true)}>Start</button>
            <button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</button>
        </div>
    </>;

    if (gameMode == GameModes.Game2player) return <>
        <div className='column'>
            <h1>Settings </h1>
            {playerInfoBlock(Cell.Red)}
            {playerInfoBlock(Cell.Blue)}
            {playerInfoBlock(Cell.Green)}
            {playerInfoBlock(Cell.Orange)}
            <button style={{ margin: "4px" }} onClick={() => setIsPlaying(true)}>Start</button>
            <button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</button>
        </div>
    </>;

    function playerInfoBlock(cell: Cell) {

        let username = usernames[Math.floor(Math.random() * usernames.length)];


        return <div className='row' style={{ margin: "4px" }}>
            <button style={{ margin: "4px" }}>Player</button>
            <input minLength={1} style={{ margin: "4px" }} value={username}></input>
            <div className='column'>
                <CellWidget value={cell} size={40} />
            </div>
        </div>;
    }
};
