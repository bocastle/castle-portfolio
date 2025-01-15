const URL = "https://bocelog.vercel.app";

import { MetadataRoute } from "next";
import { getPageList } from "./(blogLayout)/api/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = ["", "/blog", "/workHistory"].map(
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
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "always",
    priority: 0.5,
  }));

  // console.log("[...posts]", [...posts]);
  // console.log("[...routes]", [...routes]);
  return [...routes, ...posts];
}
