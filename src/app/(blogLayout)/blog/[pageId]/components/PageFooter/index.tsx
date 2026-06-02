import { fetchArticlePageFooterData } from "@/app/(blogLayout)/api/blog";
import BlogFooter from "@/components/BlogFooter";

interface Props {
  pageId: string;
}

const PageFooter = async ({ pageId }: Props) => {
  const footerItem = await fetchArticlePageFooterData(pageId);
  //   console.log("headerItem", headerItem);
  return <BlogFooter footerItem={footerItem}></BlogFooter>;
};

export default PageFooter;
