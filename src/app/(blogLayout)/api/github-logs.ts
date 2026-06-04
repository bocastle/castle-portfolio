import {
  AllArticle,
  ArticleCategoryProps,
  ArticlePageFooterData,
  ArticlePageHeaderDataWithBlur,
  BlogCategory,
  BlogTag,
} from "./types";

const LOGS_PAGE_ID_PREFIX = "logs-";
const LOGS_RAW_BASE_URL = "https://raw.githubusercontent.com/bocastle/logs/main";
const RAW_MARKDOWN_REVALIDATE_SECONDS = 3600;
const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

type GitHubLogsArticleMeta = {
  order: number;
  path: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string[];
  tags: string[];
  thumbnailUrl: string;
};

const THUMBNAILS = {
  backend: "/images/blog/logs/backend.svg",
  devops: "/images/blog/logs/devops.svg",
  frontend: "/images/blog/logs/frontend.svg",
  go: "/images/blog/logs/go.svg",
  javascript: "/images/blog/logs/javascript.svg",
} as const;

const LOGS_ARTICLES: GitHubLogsArticleMeta[] = [
  {
    order: 1,
    path: "백엔드 면접준비/ CICD 파이프라인 정리.md",
    slug: "cicd-pipeline",
    title: "CI/CD 파이프라인 정리",
    description:
      "빌드, 테스트, 배포 흐름을 운영 관점에서 정리한 CI/CD 파이프라인 글입니다.",
    createdAt: "2026-06-04",
    updatedAt: "2026-06-04",
    category: ["Backend"],
    tags: ["CI/CD", "Deployment", "Backend"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 2,
    path: "백엔드 면접준비/API Gateway 정리.md",
    slug: "api-gateway",
    title: "API Gateway 정리",
    description:
      "API Gateway가 필요한 이유와 인증, 라우팅, 운영 흐름을 정리한 글입니다.",
    createdAt: "2026-06-03",
    updatedAt: "2026-06-03",
    category: ["Backend"],
    tags: ["API", "Gateway", "Backend"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 3,
    path: "백엔드 면접준비/CORS(Cross-Origin Resource Sharing) 정리.md",
    slug: "cors",
    title: "CORS 정리",
    description:
      "브라우저와 백엔드 API 사이에서 자주 마주치는 CORS 동작과 대응을 정리한 글입니다.",
    createdAt: "2026-06-02",
    updatedAt: "2026-06-02",
    category: ["Backend"],
    tags: ["CORS", "API", "Web"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 4,
    path: "백엔드 면접준비/DB Replication 정리 (MySQL InnoDB 중심).md",
    slug: "db-replication",
    title: "DB Replication 정리",
    description:
      "MySQL InnoDB 중심으로 읽기 복제와 장애 대응 구조를 정리한 글입니다.",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
    category: ["Backend"],
    tags: ["Database", "MySQL", "Replication"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 5,
    path: "백엔드 면접준비/JPA N+1 문제.md",
    slug: "jpa-n-plus-one",
    title: "JPA N+1 문제",
    description:
      "JPA에서 N+1 문제가 생기는 흐름과 조회 최적화 방향을 정리한 글입니다.",
    createdAt: "2026-05-31",
    updatedAt: "2026-05-31",
    category: ["Backend"],
    tags: ["JPA", "Database", "Spring"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 6,
    path: "백엔드 면접준비/데이터베이스 인덱스 정리.md",
    slug: "database-index",
    title: "데이터베이스 인덱스 정리",
    description:
      "쿼리 성능과 실행 계획을 이해하기 위한 데이터베이스 인덱스 정리 글입니다.",
    createdAt: "2026-05-30",
    updatedAt: "2026-05-30",
    category: ["Backend"],
    tags: ["Database", "Index", "SQL"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 7,
    path: "백엔드 면접준비/스프링 트랜잭션 AOP 동작 흐름 정리.md",
    slug: "spring-transaction-aop",
    title: "스프링 트랜잭션 AOP 동작 흐름 정리",
    description:
      "Spring 트랜잭션이 프록시와 AOP를 통해 적용되는 흐름을 정리한 글입니다.",
    createdAt: "2026-05-29",
    updatedAt: "2026-05-29",
    category: ["Backend"],
    tags: ["Spring", "Transaction", "AOP"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 8,
    path: "백엔드 면접준비/외부 서비스 장애 대응 전략 정리.md",
    slug: "external-service-failure",
    title: "외부 서비스 장애 대응 전략 정리",
    description:
      "외부 API 장애가 서비스 전체 장애로 번지지 않도록 대응하는 전략을 정리한 글입니다.",
    createdAt: "2026-05-28",
    updatedAt: "2026-05-28",
    category: ["Backend"],
    tags: ["Resilience", "API", "Operations"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 9,
    path: "백엔드 면접준비/Rate Limiting 정리.md",
    slug: "rate-limiting",
    title: "Rate Limiting 정리",
    description:
      "트래픽 제어와 API 보호를 위한 Rate Limiting 개념과 적용 포인트를 정리한 글입니다.",
    createdAt: "2026-05-27",
    updatedAt: "2026-05-27",
    category: ["Backend"],
    tags: ["Rate Limiting", "API", "Operations"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 10,
    path: "백엔드 면접준비/낙관적 락과 비관적 락 정리.md",
    slug: "optimistic-pessimistic-lock",
    title: "낙관적 락과 비관적 락 정리",
    description:
      "동시성 제어에서 낙관적 락과 비관적 락을 어떻게 선택하는지 정리한 글입니다.",
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
    category: ["Backend"],
    tags: ["Database", "Lock", "Concurrency"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 11,
    path: "프론트 면접준비/React Query와 서버 상태 관리 정리.md",
    slug: "react-query-server-state",
    title: "React Query와 서버 상태 관리 정리",
    description:
      "프론트엔드에서 서버 상태, 캐시, 재요청 흐름을 다루는 방식을 정리한 글입니다.",
    createdAt: "2026-05-25",
    updatedAt: "2026-05-25",
    category: ["Frontend"],
    tags: ["React", "React Query", "Cache"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 12,
    path: "프론트 면접준비/SSR과 CSR 정리.md",
    slug: "ssr-csr",
    title: "SSR과 CSR 정리",
    description:
      "렌더링 위치와 사용자 경험, SEO 관점에서 SSR과 CSR을 비교한 글입니다.",
    createdAt: "2026-05-24",
    updatedAt: "2026-05-24",
    category: ["Frontend"],
    tags: ["SSR", "CSR", "Next.js"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 13,
    path: "프론트 면접준비/브라우저 렌더링 과정 정리.md",
    slug: "browser-rendering",
    title: "브라우저 렌더링 과정 정리",
    description:
      "HTML, CSS, JavaScript가 화면으로 그려지는 브라우저 렌더링 과정을 정리한 글입니다.",
    createdAt: "2026-05-23",
    updatedAt: "2026-05-23",
    category: ["Frontend"],
    tags: ["Browser", "Rendering", "Performance"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 14,
    path: "프론트 면접준비/React Error Boundary 정리.md",
    slug: "react-error-boundary",
    title: "React Error Boundary 정리",
    description:
      "React 컴포넌트 오류 격리와 복구 UI를 위한 Error Boundary를 정리한 글입니다.",
    createdAt: "2026-05-22",
    updatedAt: "2026-05-22",
    category: ["Frontend"],
    tags: ["React", "Error Boundary", "UI"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 15,
    path: "프론트 면접준비/Spring Boot와 Next.js 캐시 정리.md",
    slug: "spring-next-cache",
    title: "Spring Boot와 Next.js 캐시 정리",
    description:
      "백엔드와 Next.js 사이에서 캐시 정책을 함께 봐야 하는 이유를 정리한 글입니다.",
    createdAt: "2026-05-21",
    updatedAt: "2026-05-21",
    category: ["Frontend"],
    tags: ["Next.js", "Spring", "Cache"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 16,
    path: "프론트 면접준비/Next.js 아키텍처 설명.md",
    slug: "nextjs-architecture",
    title: "Next.js 아키텍처 설명",
    description:
      "Next.js 애플리케이션 구조와 렌더링 흐름을 아키텍처 관점에서 정리한 글입니다.",
    createdAt: "2026-05-20",
    updatedAt: "2026-05-20",
    category: ["Frontend"],
    tags: ["Next.js", "Architecture", "React"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 17,
    path: "프론트 면접준비/웹 접근성(a11y) 정리.md",
    slug: "web-accessibility",
    title: "웹 접근성(a11y) 정리",
    description:
      "사용자가 놓치지 않도록 웹 접근성의 핵심 기준과 개선 방향을 정리한 글입니다.",
    createdAt: "2026-05-19",
    updatedAt: "2026-05-19",
    category: ["Frontend"],
    tags: ["Accessibility", "HTML", "Frontend"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 18,
    path: "DevOps/Zendesk Guide 테마에서 i18n.json fetch가 막힐 때 JSON 대신 JS로 다국어 처리하기.md",
    slug: "zendesk-i18n-js",
    title: "Zendesk Guide 다국어 처리 정리",
    description:
      "Zendesk Guide 테마에서 i18n JSON fetch 제약을 우회한 운영형 다국어 처리 기록입니다.",
    createdAt: "2026-05-18",
    updatedAt: "2026-05-18",
    category: ["DevOps"],
    tags: ["Zendesk", "i18n", "JavaScript"],
    thumbnailUrl: THUMBNAILS.devops,
  },
  {
    order: 19,
    path: "DevOps/테스트하기 쉬운 코드의 조건.md",
    slug: "testable-code",
    title: "테스트하기 쉬운 코드의 조건",
    description:
      "테스트 가능성을 높이는 코드 구조와 의존성 분리 기준을 정리한 글입니다.",
    createdAt: "2026-05-17",
    updatedAt: "2026-05-17",
    category: ["DevOps"],
    tags: ["Testing", "Quality", "Frontend"],
    thumbnailUrl: THUMBNAILS.devops,
  },
  {
    order: 20,
    path: "JavaScript/async-mutex를 사용한 간단한 뮤텍스(Mutex) 설명.md",
    slug: "async-mutex",
    title: "async-mutex를 사용한 뮤텍스 설명",
    description:
      "JavaScript 비동기 흐름에서 mutex가 필요한 상황과 사용법을 정리한 글입니다.",
    createdAt: "2026-05-16",
    updatedAt: "2026-05-16",
    category: ["JavaScript"],
    tags: ["JavaScript", "Concurrency", "Mutex"],
    thumbnailUrl: THUMBNAILS.javascript,
  },
  {
    order: 21,
    path: "Go/goroutine(고루틴).md",
    slug: "goroutine",
    title: "goroutine(고루틴)",
    description:
      "Go 언어의 경량 동시성 실행 단위인 goroutine 개념을 정리한 글입니다.",
    createdAt: "2026-05-15",
    updatedAt: "2026-05-15",
    category: ["Go"],
    tags: ["Go", "Goroutine", "Concurrency"],
    thumbnailUrl: THUMBNAILS.go,
  },
];

const isEnabled = () => process.env.GITHUB_LOGS_BLOG_ENABLED !== "false";

const toSafeSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "article";
};

const toTokenId = (prefix: string, name: string) =>
  `${prefix}-${toSafeSlug(name)}`;

const toArticleNumericId = (pageId: string) =>
  pageId.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);

const toPageId = (article: GitHubLogsArticleMeta) =>
  `${LOGS_PAGE_ID_PREFIX}${toSafeSlug(article.slug)}`;

const toCategory = (name: string): BlogCategory => ({
  id: toTokenId("logs-category", name),
  name,
  description: null,
});

const toTag = (name: string): BlogTag => ({
  id: toTokenId("logs-tag", name),
  name,
});

const getArticleList = () => {
  if (!isEnabled()) {
    return [];
  }

  return [...LOGS_ARTICLES].sort((left, right) => {
    const dateDiff =
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    return dateDiff || left.order - right.order;
  });
};

const uniqueByName = <T extends { name: string }>(items: T[]) =>
  Array.from(new Map(items.map((item) => [item.name, item])).values()).sort(
    (left, right) => (left.name > right.name ? 1 : -1)
  );

const toAllArticle = (article: GitHubLogsArticleMeta): AllArticle => {
  const pageId = toPageId(article);

  return {
    id: toArticleNumericId(pageId),
    title: article.title,
    categoryList: article.category.map(toCategory),
    tagList: article.tags.map(toTag),
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
    thumbnailUrl: article.thumbnailUrl,
    pageId,
    source: "github",
  };
};

const toArticleHeader = (
  article: GitHubLogsArticleMeta
): ArticlePageHeaderDataWithBlur => ({
  title: article.title,
  description: article.description,
  categoryList: article.category.map(toCategory),
  tagList: article.tags.map(toTag),
  createdAt: new Date(article.createdAt),
  thumbnailUrl: article.thumbnailUrl,
  blurDataUrl: DEFAULT_BLUR_DATA_URL,
  source: "github",
});

const encodeLogsPath = (logsPath: string) =>
  logsPath.split("/").map(encodeURIComponent).join("/");

const toRawMarkdownUrl = (article: GitHubLogsArticleMeta) =>
  `${LOGS_RAW_BASE_URL}/${encodeLogsPath(article.path)}`;

const stripFirstH1 = (markdown: string) => {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim());

  if (firstContentIndex === -1) {
    return "";
  }

  if (/^#\s+/.test(lines[firstContentIndex].trim())) {
    lines.splice(firstContentIndex, 1);
  }

  return lines.join("\n").trimStart();
};

const findArticleByPageId = (pageId: string) => {
  const articleList = getArticleList();
  const article = articleList.find((item) => toPageId(item) === pageId);

  if (!article) {
    throw new Error(`GitHub logs article not found: ${pageId}`);
  }

  return { article, articleList };
};

export const isGitHubLogsPageId = (pageId: string) =>
  pageId.startsWith(LOGS_PAGE_ID_PREFIX);

export const getPageList = async (): Promise<AllArticle[]> =>
  getArticleList().map(toAllArticle);

export const getCategoryList = async ({
  categoryName,
}: ArticleCategoryProps): Promise<AllArticle[]> => {
  const list = await getPageList();

  if (!categoryName) {
    return list;
  }

  return list.filter((article) =>
    article.categoryList.some((category) => category.name === categoryName)
  );
};

export const getArticleCategoryList = async (): Promise<BlogCategory[]> =>
  uniqueByName(
    getArticleList().flatMap((article) => article.category.map(toCategory))
  );

export const getArticleTagList = async (): Promise<BlogTag[]> =>
  uniqueByName(getArticleList().flatMap((article) => article.tags.map(toTag)));

export const getArticlePageHeaderData = async (pageId: string) =>
  fetchArticlePageHeaderData(pageId);

export const fetchArticlePageHeaderData = async (pageId: string) => {
  const { article } = findArticleByPageId(pageId);
  return toArticleHeader(article);
};

export const fetchArticlePageContent = async (pageId: string) => {
  const { article } = findArticleByPageId(pageId);
  const response = await fetch(toRawMarkdownUrl(article), {
    next: { revalidate: RAW_MARKDOWN_REVALIDATE_SECONDS },
  } as RequestInit & { next: { revalidate: number } });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub logs article: ${pageId} (${response.status})`
    );
  }

  const markdown = await response.text();
  return { parent: stripFirstH1(markdown) };
};

export const fetchArticlePageFooterData = async (
  pageId: string
): Promise<ArticlePageFooterData> => {
  const { articleList } = findArticleByPageId(pageId);
  const allArticleList = articleList.map(toAllArticle);
  const index = allArticleList.findIndex((article) => article.pageId === pageId);

  return {
    prevArticle:
      index > 0
        ? {
            pageId: allArticleList[index - 1].pageId,
            title: allArticleList[index - 1].title,
          }
        : undefined,
    nextArticle:
      index >= 0 && index < allArticleList.length - 1
        ? {
            pageId: allArticleList[index + 1].pageId,
            title: allArticleList[index + 1].title,
          }
        : undefined,
  };
};
