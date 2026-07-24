import { SHOW_PORTFOLIO } from "@/constants/feature-flags";

type NavLink = {
  key: string;
  name: string;
  href: string;
};

const allNavLinks: NavLink[] = [
  {
    key: "blog",
    name: "Blog",
    href: "/blog",
  },
  {
    key: "WorkHistory",
    name: "WorkHistory",
    href: "/workHistory",
  },
];

// 당분간 블로그만 운영 (2026-07-25). SHOW_PORTFOLIO 복구 시 WorkHistory 메뉴가 돌아온다.
export const navLinks: NavLink[] = allNavLinks.filter(
  (link) => SHOW_PORTFOLIO || link.key !== "WorkHistory"
);
