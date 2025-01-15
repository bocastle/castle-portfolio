import { ArticleLinkerData } from "@/app/(blogLayout)/api/types";
import Link from "next/link";

interface Props {
  articleLinkerDataType: "prev" | "next";
  articleLinkerData: ArticleLinkerData;
}
const ArticleLinkCard = ({
  articleLinkerDataType,
  articleLinkerData,
}: Props) => {
  //   console.log("articleLinkerData", articleLinkerData);

  return (
    <Link href={`/blog/${articleLinkerData.pageId}`}>
      <div
        className={`w-full flex bg-slate-800 p-4 rounded justify-start h-[106px] items-center gap-4 ${
          articleLinkerDataType === "prev" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div>
          {articleLinkerDataType === "next" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <g fill="none" fillRule="nonzero">
                <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.105.074.014.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.092.01-.009.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                <path
                  fill="#ffffff"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.005 3.758a1 1 0 0 1 1.32-.084l.094.084 3.535 3.535a1 1 0 0 1 .083 1.32l-.083.094-3.535 3.536a1 1 0 0 1-1.498-1.32l.084-.094 1.828-1.83H7.757a1 1 0 0 1-.116-1.992L7.757 11h6.076l-1.828-1.828a1 1 0 0 1 0-1.414Z"
                />
              </g>
            </svg>
          )}
          {articleLinkerDataType === "prev" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <g fill="none" fillRule="nonzero">
                <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z" />
                <path
                  fill="#ffffff"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1.419 3.757a1 1 0 0 1 1.498 1.32l-.084.094-1.828 1.83h6.076a1 1 0 0 1 .116 1.992l-.116.007h-6.076l1.829 1.828a1 1 0 0 1-1.32 1.498l-.095-.084-3.535-3.535a1 1 0 0 1-.083-1.32l.083-.094 3.535-3.536Z"
                />
              </g>
            </svg>
          )}
        </div>
        <div className="flex flex-col overflow-hidden gap-1">
          <span
            className={`${
              articleLinkerDataType === "prev" ? "text-left" : "text-right"
            } text-sm font-bold text-slate-400`}
          >
            {articleLinkerDataType === "prev" ? "이전" : "다음"}&nbsp;게시글
          </span>
          <span
            className={`${
              articleLinkerDataType === "prev" ? "text-left" : "text-right"
            } text-lg font-semibold text-white`}
          >
            {articleLinkerData.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleLinkCard;
