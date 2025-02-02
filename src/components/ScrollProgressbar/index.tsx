"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export const ScrollProgress = () => {
  const [width, setWidth] = useState<number>(0);

  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setWidth(0);
      return;
    }

    const windowHeight: number = scrollHeight - clientHeight;

    const currentPercent: number = scrollTop / windowHeight;

    setWidth(currentPercent * 100);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);
  return (
    <div
      className="w-full h-1 bg-gray-200 fixed top-0 left-0 right-0 z-10"
      ref={progressRef}
    >
      <div className="h-full bg-blue-500" style={{ width: width + "%" }}></div>
    </div>
  );
};
