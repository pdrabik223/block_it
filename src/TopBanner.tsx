
export interface TopBannerRef {
  leading?: React.ReactNode
  title?: string,
  following?: React.ReactNode
}

export const TopBanner: React.FC<TopBannerRef> = (props: TopBannerRef) => {

  return <div style={{ position: "absolute", height: "80px", width: "96%", backgroundColor: 'transparent', left: "2%", right: "2%", top: "0px", display: 'flex', alignItems: 'center' }}>
    {props.leading}
    <div className='row' >
      <h2 style={{ fontSize: 'xx-large' }}>{props.title}</h2>
    </div>
    {props.following}
  </div>;
};
