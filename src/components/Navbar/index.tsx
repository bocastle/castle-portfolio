"use client";

import { trackEvent } from "@/utils/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "../config/config";
import ThemeButton from "./components/ThemeButton";

const Navbar = () => {
  const currentPathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    const nextOpen = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextOpen);
    trackEvent(nextOpen ? "Mobile Menu Open" : "Mobile Menu Close", {
      path: currentPathName,
    });
  };

  const handleNavClick = (label: string, href: string) => {
    setIsMobileMenuOpen(false);
    trackEvent("Nav Click", {
      label,
      href,
      from: currentPathName,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:px-12">
        <Link
          className="italic text-xl font-black"
          href="/"
          onClick={() => handleNavClick("castle.log", "/")}
        >
          castle.log
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center p-0 text-slate-900 transition-colors hover:text-teal-700 dark:text-white dark:hover:text-teal-300 md:hidden"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          onClick={handleToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-7 w-7 transition-transform duration-200"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-5 md:flex">
          <ThemeButton />
          {navLinks.map((item) => {
            const isUnderlined = currentPathName.includes(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => handleNavClick(item.name, item.href)}
                className={`italic text-2xl font-semibold ${
                  isUnderlined
                    ? "underline decoration-solid underline-offset-8"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="모바일 메뉴"
          className="border-t border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-end py-2">
              <ThemeButton />
            </div>
            {navLinks.map((item) => {
              const isUnderlined = currentPathName.includes(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => handleNavClick(item.name, item.href)}
                  className={`border-t border-gray-200 py-3 text-base font-semibold dark:border-slate-800 ${
                    isUnderlined
                      ? "text-teal-700 underline decoration-solid underline-offset-4 dark:text-teal-300"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
