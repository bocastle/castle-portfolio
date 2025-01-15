const URL = "https://bocelog.vercel.app";

export default async function sitemap() {
  const routes = ["", "/blog", "/workHistory"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [...routes];
}
