"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
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
