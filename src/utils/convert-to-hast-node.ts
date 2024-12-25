import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const convertToHastNode = (jsxNode: ReactElement) => {
  return fromHtmlIsomorphic(renderToStaticMarkup(jsxNode), {
    fragment: true,
  }).children;
};
