"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  // 서버·클라이언트 초기 렌더를 항상 "light"로 고정해 하이드레이션 불일치를 없앤다.
  // 실제 테마 반영은 아래 useEffect에서 한다. (초기값에서 window.__theme를 읽으면
  // 클라이언트 초기 상태가 이미 실제 테마라 setTheme가 no-op이 되고, 서버가 그린
  // 잘못된 아이콘 DOM이 그대로 남는다.)
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
    // 마운트 후 실제 적용된 테마로 맞춘다. 초기 "light"와 다르면 리렌더되어
    // 아이콘이 실제 테마에 맞게 갱신되고, 첫 클릭부터 정상 토글된다.
    setTheme(global.window.__theme);
  }, []);

  return (
    <button type="button" className="m-0 p-0" onClick={toggleTheme}>
      {isDark ? (
        <Image src="/images/moon.svg" alt="dark mode" width={30} height={30} />
      ) : (
        <Image src="/images/sun.svg" alt="light mode" width={30} height={30} />
      )}
    </button>
  );
};

export default ThemeButton;
