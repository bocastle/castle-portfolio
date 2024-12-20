"use client";

import { NotionRenderer } from "react-notion-x";

interface Props {
  recordMap: any;
  rootPageId: string;
}

const BlogDetail = ({ recordMap, rootPageId }: Props) => {
  return (
    <div className="w-full max-w-4xl">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        // previewImages
        disableHeader
      />
    </div>
  );
};

export default BlogDetail;
