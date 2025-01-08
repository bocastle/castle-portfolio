"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../config/config";
const Navbar = () => {
  const currentPathName = usePathname();
  // console.log("currentPathName", currentPathName);

  const handleToggle = () => {
    console.log("handleToggle 준비");
    alert("모바일 준비중입니다.");
  };
  return (
    <div className="h-2 sticky flex items-center justify-between top-110 md:static md:h-20 md:flex md:justify-between md:items-center md:gap-5 md:px-12 max-md:h-20 max-md:px-12 max-md:flex max-md:justify-between">
      <div className="flex md:flex">
        <Link
          className="italic text-1xl md:block text-white font-black"
          href={"/"}
        >
          castle.log
        </Link>
      </div>
      <button
        type="button"
        className="m-0 p-0 md:hidden max-md:flex"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 transition duration-500 stroke-black dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div className="flex gap-5 md:flex sm:hidden max-md:hidden">
        {navLinks.map((item, index) => {
          const isUnderlined = currentPathName.includes(item.href);
          // console.log("isUnderlined", isUnderlined);
          return (
            <Link
              key={`${item.key}${index}`}
              href={item.href}
              className={`italic text-2xl md:block text-white font-semibold ${
                isUnderlined
                  ? "underline decoration-solid underline-offset-8"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
