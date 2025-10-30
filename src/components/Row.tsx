import { v4 as uuidv4 } from 'uuid';

export interface RowRef {
    children: React.ReactNode,
    expanded?: boolean,
    key?: React.Key,
    style?: React.CSSProperties
    id?: string
    className?: string
}


export const Row: React.FC<RowRef> = (props: RowRef) => {

    let expanded = props.expanded != undefined ? props.expanded : false
    let key: React.Key = props.key != undefined ? props.key : uuidv4()

    return <div
        className={props.className}
        id={props.id}
        key={key}
        style={
            (() => {
                const baseStyle: React.CSSProperties = {
                    display: "flex",
                    flex: "auto",
                    flexDirection: "row",
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