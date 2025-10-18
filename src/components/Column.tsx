import { v4 as uuidv4 } from 'uuid';

export interface ColumnRef {
    children: React.ReactNode,
    expanded?: boolean
    key?: React.Key | null
    style?: React.CSSProperties
    id?: string
}


export const Column: React.FC<ColumnRef> = (props: ColumnRef) => {

    let expanded = props.expanded != undefined ? props.expanded : false
    let key = props.key != undefined ? props.key : uuidv4()

    return <div
        key={key}
        id={props.id}
        style={
            (() => {
                const baseStyle: React.CSSProperties = {
                    display: "flex",
                    flex: "auto",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    height: expanded ? "100%" : undefined
                };

                return { ...baseStyle, ...(props.style || {}) } as React.CSSProperties;
            })()

        }>
        {props.children}
    </div >

}