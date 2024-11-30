import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const usePlatform = (): "desktop" | "tablet" | "mobile" => {
  const [platform, setPlatform] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  const tablet = useMediaQuery({ query: "(max-width: 1199px)" });
  const mobile = useMediaQuery({ query: "(max-width: 599px)" });

  useEffect(() => {
    if (mobile) setPlatform("mobile");
    else if (tablet) setPlatform("tablet");
    else setPlatform("desktop");
    // setIsMobile(mobile);
  }, [mobile, tablet]);

  return platform;
};

export default usePlatform;
