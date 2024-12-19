import BlogDetail from "@/components/BlogDetail";
import { NotionAPI } from "notion-client";

type ArticleDetailPageProps = { params: { pageId: string } };

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { pageId } = await params;
  console.log("pageId:::", pageId);
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(pageId);
  return (
    <div className="items-start mx-auto px-80 flex flex-col gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5">
      <BlogDetail recordMap={recordMap} rootPageId={pageId} />
    </div>
  );
}
