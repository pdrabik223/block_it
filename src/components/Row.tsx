export interface RowRef {
    children: React.ReactNode,
    expanded?: boolean,
    key?: React.Key | null,
    style?: React.CSSProperties
    id?: string
}


export const Row: React.FC<RowRef> = (props: RowRef) => {

    let expanded = props.expanded != undefined ? props.expanded : false

    return <div
        id={props.id}
        key={props.key}
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