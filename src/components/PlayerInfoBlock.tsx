import { useImperativeHandle, useRef, useState } from "react";
import { basicEnginesMap, advancedEnginesMap2Player } from "../pages/EngineGameUI.tsx";
import type { Cell } from "../engine/enum_definitions.tsx";
import { Button } from "./Button.tsx";
import { CellWidget } from "./CellWidget.tsx";
import { v4 as uuidv4 } from 'uuid';
import { Column } from "./Column.tsx";
import { Row } from "./Row.tsx";
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

export interface PlayerInfoRef {
    getState: () => [boolean, string];

}

interface PlayerInfoBlockProps {
    ref: React.RefObject<PlayerInfoRef | null>;
    cell: Cell,
    values: string[]
}

export const PlayerInfoBlock: React.FC<PlayerInfoBlockProps> = (props: PlayerInfoBlockProps) => {


    const [isPlayer, setIsPlayer] = useState(false);
    const [engine, setEngine] = useState<string>(props.values[0]);

    useImperativeHandle(props.ref, () => ({
        getState: () => [!isPlayer, isPlayer ? usernameValueRef.current!.getState() : engine],
    }));

    const usernameValueRef = useRef<InputValueRef>(null);

    let EngineOptions = [];

    for (let value of props.values) {
        EngineOptions.push(<option style={{ margin: "4px", fontSize: 'large' }} key={uuidv4()} value={value}>{value}</option>)
    }

    return <Row key={uuidv4()} style={{ margin: "4px", }}>
        <Button style={{ margin: "4px", width: "100px" }} onClick={() => { setIsPlayer(!isPlayer) }}>{isPlayer ? "Player" : "Engine"}</Button>

        {isPlayer ? <ControlledInput ref={usernameValueRef} /> :

            <select style={{ margin: "4px", width: "220px", fontSize: 'large' }} value={engine} onChange={(e) => setEngine(e.currentTarget.value)}>
                {EngineOptions}
            </select>}

        <Column>
            <CellWidget value={props.cell} size={40} />
        </Column>
    </Row>;
}

export interface InputValueRef {
    getState: () => string;
}

interface ControlledInputProps { ref: React.RefObject<InputValueRef | null> }

export const ControlledInput: React.FC<ControlledInputProps> = (props: ControlledInputProps) => {

    const [value, setValue] = useState<string>(usernames[Math.floor(Math.random() * usernames.length)]);

    useImperativeHandle(props.ref, () => ({
        getState: () => value,
    }));

    return <input onChange={(v) => { setValue(v.target.value) }} minLength={1} style={{ margin: "4px", fontSize: 'large', width: "220px" }} value={value}></input>
}