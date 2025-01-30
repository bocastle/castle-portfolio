"use client";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
interface Props {
  PID: string;
  SLOT: string;
}

const GoogleAdSenseComponent = ({ PID, SLOT }: Props) => {
  //   useEffect(() => {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={`ca-pub-${PID}`}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  );
};
export default GoogleAdSenseComponent;
