const DEFAULT_PUBLIC_IMAGE_BASE_URL = "https://i.ibb.co";

export const getPublicImageUrl = (path: string) => {
  if (path.startsWith("/") || /^https?:\/\//.test(path)) {
    return path;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_IMG?.replace(/\/$/, "") ??
    DEFAULT_PUBLIC_IMAGE_BASE_URL;
  const normalizedPath = path.replace(/^\//, "");

  return `${baseUrl}/${normalizedPath}`;
};
