import { Row } from "./components/Row.tsx"

export interface TopBannerRef {
  leading?: React.ReactNode
  title?: string,
  following?: React.ReactNode
}

export const TopBanner: React.FC<TopBannerRef> = (props: TopBannerRef) => {
  let leading = props.leading == undefined ? null : props.leading
  let following = props.following == undefined ? null : props.following


  if (leading == null && following != null) {
    leading = <div style={{
      pointerEvents: 'none',
      opacity: 0.0
    }}> {following}</div>
  }
  else if (leading != null && following == null) {
    following = <div style={{
      pointerEvents: 'none',
      opacity: 0.0
    }}> {following}</div>
  }


  return <div style={{}}>
    <div style={{
      maxWidth: '1600px',
      margin: 'auto',
      position: "absolute", height: "80px", width: "96%",
      backgroundColor: 'transparent', left: "2%", right: "2%", top: "0px", display: 'flex',
      alignItems: 'center',
    }}>
      {leading}
      <Row >
        <h2 style={{ fontSize: 'xx-large' }}>{props.title}</h2>
      </Row>
      {following}
    </div ></div>
};
