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
      "코드 변경이 테스트와 배포를 거쳐 서비스에 반영되는 흐름을 운영 관점에서 정리했습니다.",
    createdAt: "2026-06-04",
    updatedAt: "2026-06-04",
    category: ["Backend"],
    tags: ["CI/CD", "Deployment", "Operations"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 2,
    path: "백엔드 면접준비/API Gateway 정리.md",
    slug: "api-gateway",
    title: "API Gateway 정리",
    description:
      "인증, 라우팅, 트래픽 제어를 한 지점에서 다루는 API Gateway의 역할을 서비스 구조 관점에서 정리했습니다.",
    createdAt: "2026-06-03",
    updatedAt: "2026-06-03",
    category: ["Backend"],
    tags: ["API", "Gateway", "Architecture"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 3,
    path: "백엔드 면접준비/CORS(Cross-Origin Resource Sharing) 정리.md",
    slug: "cors",
    title: "CORS 정리",
    description:
      "브라우저와 백엔드 API가 만나는 지점에서 CORS가 왜 발생하고 어떻게 검증해야 하는지 정리했습니다.",
    createdAt: "2026-06-02",
    updatedAt: "2026-06-02",
    category: ["Backend"],
    tags: ["CORS", "API", "Browser"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 4,
    path: "백엔드 면접준비/DB Replication 정리 (MySQL InnoDB 중심).md",
    slug: "db-replication",
    title: "DB Replication 정리",
    description:
      "MySQL InnoDB 기준으로 읽기 분산, 복제 지연, 장애 대응을 함께 고려하는 데이터 운영 구조를 정리했습니다.",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
    category: ["Backend"],
    tags: ["Database", "MySQL", "Reliability"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 5,
    path: "백엔드 면접준비/JPA N+1 문제.md",
    slug: "jpa-n-plus-one",
    title: "JPA N+1 문제",
    description:
      "JPA 조회 코드가 실제 SQL과 성능 문제로 이어지는 흐름을 추적하고 최적화 선택지를 정리했습니다.",
    createdAt: "2026-05-31",
    updatedAt: "2026-05-31",
    category: ["Backend"],
    tags: ["JPA", "Database", "Performance"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 6,
    path: "백엔드 면접준비/데이터베이스 인덱스 정리.md",
    slug: "database-index",
    title: "데이터베이스 인덱스 정리",
    description:
      "쿼리 성능을 실행 계획과 데이터 접근 패턴으로 설명하기 위해 인덱스 선택 기준을 정리했습니다.",
    createdAt: "2026-05-30",
    updatedAt: "2026-05-30",
    category: ["Backend"],
    tags: ["Database", "Index", "Performance"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 7,
    path: "백엔드 면접준비/스프링 트랜잭션 AOP 동작 흐름 정리.md",
    slug: "spring-transaction-aop",
    title: "Spring 트랜잭션과 AOP 적용 흐름",
    description:
      "Spring 트랜잭션이 프록시와 AOP를 통해 적용되는 흐름을 코드 구조와 장애 분석 관점에서 정리했습니다.",
    createdAt: "2026-05-29",
    updatedAt: "2026-05-29",
    category: ["Backend"],
    tags: ["Spring", "Transaction", "Architecture"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 8,
    path: "백엔드 면접준비/외부 서비스 장애 대응 전략 정리.md",
    slug: "external-service-failure",
    title: "외부 서비스 장애 대응 전략 정리",
    description:
      "외부 API 장애가 서비스 전체 장애로 번지지 않도록 타임아웃, 재시도, fallback 기준을 정리했습니다.",
    createdAt: "2026-05-28",
    updatedAt: "2026-05-28",
    category: ["Backend"],
    tags: ["Resilience", "API", "Reliability"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 9,
    path: "백엔드 면접준비/Rate Limiting 정리.md",
    slug: "rate-limiting",
    title: "Rate Limiting으로 API 보호하기",
    description:
      "트래픽 급증과 남용을 제어하기 위한 Rate Limiting 전략을 API 보호와 운영 안정성 관점에서 정리했습니다.",
    createdAt: "2026-05-27",
    updatedAt: "2026-05-27",
    category: ["Backend"],
    tags: ["Rate Limiting", "API", "Reliability"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 10,
    path: "백엔드 면접준비/낙관적 락과 비관적 락 정리.md",
    slug: "optimistic-pessimistic-lock",
    title: "낙관적 락과 비관적 락 정리",
    description:
      "동시성 충돌 가능성과 사용자 경험을 함께 보며 낙관적 락과 비관적 락 선택 기준을 정리했습니다.",
    createdAt: "2026-05-26",
    updatedAt: "2026-05-26",
    category: ["Backend"],
    tags: ["Database", "Concurrency", "Consistency"],
    thumbnailUrl: THUMBNAILS.backend,
  },
  {
    order: 11,
    path: "프론트 면접준비/React Query와 서버 상태 관리 정리.md",
    slug: "react-query-server-state",
    title: "React Query와 서버 상태 관리 정리",
    description:
      "프론트엔드에서 서버 상태를 화면 상태와 분리하고 캐시, 재요청, 동기화 흐름을 설계하는 기준을 정리했습니다.",
    createdAt: "2026-05-25",
    updatedAt: "2026-05-25",
    category: ["Frontend"],
    tags: ["React", "React Query", "State"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 12,
    path: "프론트 면접준비/SSR과 CSR 정리.md",
    slug: "ssr-csr",
    title: "SSR/CSR 렌더링 전략 비교",
    description:
      "렌더링 위치가 초기 표시 속도, SEO, 사용자 경험에 주는 영향을 SSR과 CSR 비교로 정리했습니다.",
    createdAt: "2026-05-24",
    updatedAt: "2026-05-24",
    category: ["Frontend"],
    tags: ["SSR", "CSR", "Rendering"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 13,
    path: "프론트 면접준비/브라우저 렌더링 과정 정리.md",
    slug: "browser-rendering",
    title: "브라우저 렌더링 과정 정리",
    description:
      "HTML, CSS, JavaScript가 화면으로 그려지는 과정을 성능 병목과 사용자 체감 속도 관점에서 정리했습니다.",
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
      "React 화면 오류가 전체 서비스 중단처럼 보이지 않도록 Error Boundary와 복구 UI 기준을 정리했습니다.",
    createdAt: "2026-05-22",
    updatedAt: "2026-05-22",
    category: ["Frontend"],
    tags: ["React", "Error Boundary", "Reliability"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 15,
    path: "프론트 면접준비/Spring Boot와 Next.js 캐시 정리.md",
    slug: "spring-next-cache",
    title: "Spring Boot와 Next.js 캐시 정리",
    description:
      "Spring Boot API와 Next.js 화면 사이에서 캐시 정책을 함께 맞춰야 하는 이유와 검증 포인트를 정리했습니다.",
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
    title: "Next.js 렌더링 경계와 아키텍처",
    description:
      "Next.js 애플리케이션의 라우팅, 서버/클라이언트 경계, 렌더링 흐름을 구조 관점에서 정리했습니다.",
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
      "웹 접근성을 시각적 완성도뿐 아니라 사용 흐름의 기본 품질로 보고 핵심 개선 기준을 정리했습니다.",
    createdAt: "2026-05-19",
    updatedAt: "2026-05-19",
    category: ["Frontend"],
    tags: ["Accessibility", "UX", "Frontend"],
    thumbnailUrl: THUMBNAILS.frontend,
  },
  {
    order: 18,
    path: "DevOps/Zendesk Guide 테마에서 i18n.json fetch가 막힐 때 JSON 대신 JS로 다국어 처리하기.md",
    slug: "zendesk-i18n-js",
    title: "Zendesk Guide i18n fetch 제약 우회 기록",
    description:
      "Zendesk Guide 운영 환경에서 JSON fetch 제약을 만났을 때 JS 기반 다국어 처리로 우회한 실무 기록입니다.",
    createdAt: "2026-05-18",
    updatedAt: "2026-05-18",
    category: ["DevOps"],
    tags: ["Zendesk", "i18n", "Operations"],
    thumbnailUrl: THUMBNAILS.devops,
  },
  {
    order: 19,
    path: "DevOps/테스트하기 쉬운 코드의 조건.md",
    slug: "testable-code",
    title: "테스트하기 쉬운 코드의 조건",
    description:
      "기능을 빨리 만드는 것보다 오래 검증 가능한 구조를 만들기 위한 의존성 분리와 테스트 기준을 정리했습니다.",
    createdAt: "2026-05-17",
    updatedAt: "2026-05-17",
    category: ["DevOps"],
    tags: ["Testing", "Quality", "Architecture"],
    thumbnailUrl: THUMBNAILS.devops,
  },
  {
    order: 20,
    path: "JavaScript/async-mutex를 사용한 간단한 뮤텍스(Mutex) 설명.md",
    slug: "async-mutex",
    title: "async-mutex로 비동기 경쟁 제어하기",
    description:
      "JavaScript 비동기 작업에서 동시에 실행되면 안 되는 흐름을 제어하기 위한 mutex 사용 기준을 정리했습니다.",
    createdAt: "2026-05-16",
    updatedAt: "2026-05-16",
    category: ["JavaScript"],
    tags: ["JavaScript", "Concurrency", "Consistency"],
    thumbnailUrl: THUMBNAILS.javascript,
  },
  {
    order: 21,
    path: "Go/goroutine(고루틴).md",
    slug: "goroutine",
    title: "Go goroutine 동시성 설계 정리",
    description:
      "Go의 goroutine을 단순 문법이 아니라 서버 작업 분산과 동시성 설계 관점에서 정리했습니다.",
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
