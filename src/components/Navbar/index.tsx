import Link from "next/link";
import { navLinks } from "../config/config";
const Navbar = () => {
  return (
    <div className="h-2 sticky top-110 md:static md:h-20 md:flex justify-between items-center gap-5 px-12 sm:hidden">
      <div>
        <Link className="italic text-1xl md:block font-black" href={"/"}>
          castle.log
        </Link>
      </div>
      <div className="flex gap-5">
        {navLinks.map((item, index) => {
          return (
            <Link
              key={`${item.key}${index}`}
              href={item.href}
              className="text-2xl md:block font-semibold"
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
