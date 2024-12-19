"use client";

import { NotionRenderer } from "react-notion-x";

interface Props {
  recordMap: any;
  rootPageId: string;
}

const BlogDetail = ({ recordMap, rootPageId }: Props) => {
  return (
    <div>
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
