const URL = "https://bocelog.vercel.app";

import { MetadataRoute } from "next";
import { SHOW_PORTFOLIO } from "@/constants/feature-flags";
import { getPageList } from "./(blogLayout)/api/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 당분간 블로그만 운영 (2026-07-25). SHOW_PORTFOLIO 복구 시 /workHistory가 다시 포함된다.
  const staticRoutes = SHOW_PORTFOLIO
    ? ["", "/blog", "/workHistory"]
    : ["", "/blog"];
  const routes: MetadataRoute.Sitemap = staticRoutes.map(
    (route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "always",
      priority: 0.5,
    })
  );

  const List = await getPageList();
  const posts: MetadataRoute.Sitemap = List.map((info) => ({
    url: `${URL}/blog/${info.pageId}`,
    lastModified: new Date(info.updatedAt).toISOString().split("T")[0],
    changeFrequency: "always",
    priority: 0.5,
  }));
  // console.log("List", List);
  // console.log("[...posts]", [...posts]);
  // console.log("[...routes]", [...routes]);
  return [...routes, ...posts];
}
