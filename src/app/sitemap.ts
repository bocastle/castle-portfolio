const URL = "https://bocelog.vercel.app";

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = ["", "/blog", "/workHistory"].map(
    (route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "daily",
      priority: 0.5,
    })
  );
  // const posts: MetadataRoute.Sitemap = ["", "/blog1", "/workHistory2"].map(
  //   (route) => ({
  //     url: `${URL}${route}`,
  //     lastModified: new Date().toISOString().split("T")[0],
  //     changeFrequency: "daily",
  //     priority: 0.5,
  //   })
  // );

  return [...routes];
}
