
export interface TopBannerRef {
  leading?: React.ReactNode
  title?: string,
  following?: React.ReactNode
}

export const TopBanner: React.FC<TopBannerRef> = (props: TopBannerRef) => {

  return <div style={{ position: "absolute", height: "80px", width: "100%", maxWidth: "1600px", backgroundColor: 'transparent', left: "0px", top: "0px", display: 'flex', alignItems: 'center' }}>
    {props.leading}
    <div className='row'>

      <h2>{props.title}</h2>

    </div>
    {props.following}
  </div>;
};
