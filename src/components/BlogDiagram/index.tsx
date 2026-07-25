import type { ReactElement } from "react";
import {
  CicdPipelineDiagram,
  ExternalFailureDiagram,
  JpaNPlusOneDiagram,
  SpringNextCacheDiagram,
} from "./diagrams";

type DiagramEntry = {
  Diagram: () => ReactElement;
  /** 도해가 무엇을 보여주는지. 그림을 못 보는 환경에서도 뜻이 남도록 쓴다. */
  caption: string;
};

/**
 * 글마다 도해가 있는 것은 아니다.
 * 한 장으로 결론을 보여줄 수 있는 글에만 붙인다.
 */
const BLOG_DIAGRAMS: Record<string, DiagramEntry> = {
  "logs-jpa-n-plus-one": {
    Diagram: JpaNPlusOneDiagram,
    caption:
      "루트 조회 뒤 연관을 건드리면 쿼리가 N건 더 붙는다. fetch join은 한 번에 가져온다.",
  },
  "logs-cicd-pipeline": {
    Diagram: CicdPipelineDiagram,
    caption:
      "단계를 나누는 이유는 속도가 아니라, 어디까지 되돌릴지 정해 두기 위해서다.",
  },
  "logs-external-service-failure": {
    Diagram: ExternalFailureDiagram,
    caption:
      "타임아웃·벌크헤드·서킷 브레이커를 앞에 세우고, 차단되면 폴백으로 떨어뜨린다.",
  },
  "logs-spring-next-cache": {
    Diagram: SpringNextCacheDiagram,
    caption: "Next.js와 Spring은 서로 다른 것을 캐시한다. 무효화도 따로 해야 한다.",
  },
};

interface Props {
  pageId: string;
}

const BlogDiagram = ({ pageId }: Props) => {
  const entry = BLOG_DIAGRAMS[pageId];
  if (!entry) return null;

  const { Diagram, caption } = entry;

  return (
    <figure className="my-8 w-full border-y border-rule py-7">
      {/* 좁은 화면에서 축소되면 라벨을 못 읽는다. 줄이는 대신 가로로 스크롤한다. */}
      <div className="overflow-x-auto">
        <div className="min-w-[620px]">
          <Diagram />
        </div>
      </div>
      <figcaption className="mt-5 text-[0.85rem] leading-6 text-muted">
        {caption}
      </figcaption>
    </figure>
  );
};

export default BlogDiagram;
