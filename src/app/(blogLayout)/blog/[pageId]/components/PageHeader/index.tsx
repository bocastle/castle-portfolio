import { fetchArticlePageHeaderData } from "@/app/(blogLayout)/api/notion";
import BlogHeader from "@/components/BlogHeader";

interface Props {
  pageId: string;
}

const PageHeader = async ({ pageId }: Props) => {
  const headerItem = await fetchArticlePageHeaderData(pageId);
  //   console.log("headerItem", headerItem);
  return <BlogHeader headerItem={headerItem}></BlogHeader>;
};

export default PageHeader;
