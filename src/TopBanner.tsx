import { Row } from "./components/Row.tsx"

export interface TopBannerRef {
  leading?: React.ReactNode
  title?: string,
  following?: React.ReactNode
}

export const TopBanner: React.FC<TopBannerRef> = (props: TopBannerRef) => {

  return <div style={{}}>
    <div style={{
      maxWidth: '1600px',
      margin: 'auto',
      position: "absolute", height: "80px", width: "96%",
      backgroundColor: 'transparent', left: "2%", right: "2%", top: "0px", display: 'flex',
      alignItems: 'center',
    }}>
      {props.leading}
      <Row >
        <h2 style={{ fontSize: 'xx-large' }}>{props.title}</h2>
      </Row>
      {props.following}
    </div ></div>
};
