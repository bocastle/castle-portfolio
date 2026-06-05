export const ArticleTagTitle = async () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        전체 글
      </p>
      <h1 className="leading-[1.15] md:text-5xl sm:text-3xl max-sm:text-3xl">
        <span className="font-semibold">글 목록</span>
      </h1>
    </div>
  );
};
