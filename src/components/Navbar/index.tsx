"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../config/config";
const Navbar = () => {
  const currentPathName = usePathname();
  console.log("currentPathName", currentPathName);
  return (
    <div className="h-2 sticky top-110 md:static md:h-20 md:flex md:justify-between md:items-center md:gap-5 md:px-12 sm:hidden">
      <div className="md:flex sm:hidden max-sm:hidden">
        <Link className="italic text-1xl md:block font-black" href={"/"}>
          castle.log
        </Link>
      </div>
      <div className="flex gap-5 md:flex sm:hidden max-sm:hidden">
        {navLinks.map((item, index) => {
          const isUnderlined = currentPathName.includes(item.href);
          console.log("isUnderlined", isUnderlined);
          return (
            <Link
              key={`${item.key}${index}`}
              href={item.href}
              className={`italic text-2xl md:block font-semibold ${
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
