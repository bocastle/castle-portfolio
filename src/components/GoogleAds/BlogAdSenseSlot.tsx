import GoogleAdSenseComponent from "./components/GoogleAdSenseComponent";

interface Props {
  className?: string;
}

const BlogAdSenseSlot = ({ className = "" }: Props) => {
  const PID = process.env.PID ?? "";
  const SLOT = process.env.SLOT ?? "";

  if (!PID || !SLOT || process.env.NEXT_PUBLIC_NODE_ENV === "dev") {
    return null;
  }

  return (
    <aside
      aria-label="advertisement"
      className={`blog-ad-slot w-full min-w-0 overflow-hidden ${className}`}
    >
      <GoogleAdSenseComponent PID={PID} SLOT={SLOT} />
    </aside>
  );
};

export default BlogAdSenseSlot;
