import Link from "next/link";
import { navLinks } from "../config/config";
const Navbar = () => {
  return (
    <div className="h-2 sticky top-110 md:static md:h-20 flex justify-end items-center gap-5 pr-12">
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
  );
};

export default Navbar;
