import { fetchArticlePageContent } from "@/app/(blogLayout)/api/notion";
import BlogDetail from "@/components/BlogDetail";

interface Props {
  pageId: string;
}

const PageContent = async ({ pageId }: Props) => {
  //   console.log("pageId", pageId);
  const { parent } = await fetchArticlePageContent(pageId);
  return <BlogDetail content={parent as string} />;
};

export default PageContent;
