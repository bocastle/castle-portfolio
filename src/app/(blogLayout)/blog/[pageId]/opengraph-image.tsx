import { getBlogTakeaway } from "@/app/(blogLayout)/api/blog-takeaways";
import { ImageResponse } from "next/og";
import { getArticlePageHeaderData } from "../../api/blog";

export const alt = "castle.log 글 커버";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fafaf8";
const INK = "#141414";
const MUTED = "#6b6b6b";
const RULE = "#e5e4df";

/**
 * 커버에 실제로 쓰이는 글자만 담은 폰트 조각을 받는다.
 * 한글 전체를 받으면 수 MB라 OG 생성에 못 쓴다.
 * satori는 woff2를 못 읽으므로 구형 User-Agent로 truetype을 받는다.
 */
const loadSubsetFont = async (text: string, weight: 400 | 600) => {
  const api = `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;

  const css = await fetch(api, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
    },
  }).then((res) => res.text());

  const src = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!src) return null;

  return fetch(src).then((res) => res.arrayBuffer());
};

type Props = { params: { pageId: string } };

export default async function OpengraphImage({ params }: Props) {
  const { pageId } = params;
  const { title, description } = await getArticlePageHeaderData(pageId);
  const takeaway = getBlogTakeaway(pageId) ?? description ?? "";

  const wordmark = "castle.log";
  const subsetText = `${title}${takeaway}${wordmark}bocelog.vercel.app`;

  const [bold, regular] = await Promise.all([
    loadSubsetFont(subsetText, 600),
    loadSubsetFont(subsetText, 400),
  ]);

  const fonts = [
    ...(bold
      ? [{ name: "PlexKR", data: bold, weight: 600 as const, style: "normal" as const }]
      : []),
    ...(regular
      ? [{ name: "PlexKR", data: regular, weight: 400 as const, style: "normal" as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: "PlexKR",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 400,
            color: MUTED,
            letterSpacing: "0.14em",
          }}
        >
          {wordmark}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 26 ? 62 : 76,
              fontWeight: 600,
              color: INK,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              fontWeight: 400,
              color: MUTED,
              lineHeight: 1.5,
            }}
          >
            {takeaway.length > 78 ? `${takeaway.slice(0, 78)}…` : takeaway}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 1, background: RULE }} />
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 22,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: "0.12em",
            }}
          >
            bocelog.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined }
  );
}
