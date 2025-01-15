const URL = "https://bocelog.vercel.app";

export default async function sitemap() {
  const routes = ["", "/blog", "/workHistory"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
