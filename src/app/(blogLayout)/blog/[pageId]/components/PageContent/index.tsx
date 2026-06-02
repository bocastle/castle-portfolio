import BlogDetail from "@/components/BlogDetail";

interface Props {
  content: string;
}

const PageContent = ({ content }: Props) => {
  return <BlogDetail content={content} />;
};

export default PageContent;
