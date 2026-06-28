# 생성형 블로그 썸네일 교체 디자인

## 목적

블로그 목록과 상세 상단 썸네일을 이직 포트폴리오에 맞는 세련된 이미지 세트로 교체한다. 단순히 개별 이미지를 예쁘게 만드는 작업이 아니라, 기술 글 전체가 하나의 브랜드처럼 보이도록 일관된 시각 언어와 안정적인 정적 자산 흐름을 만든다.

현재 문제는 두 가지다.

- GitHub logs 글은 `backend.svg`, `frontend.svg` 같은 단순 카테고리 아이콘을 반복해서 사용해 글별 차별성이 약하다.
- Notion 글은 `prod-files-secure.s3` 임시 URL을 사용할 수 있어 만료와 외부 의존 문제가 남아 있다.

## 범위

1차 범위는 이직에 직접 도움이 되는 핵심 글 8~12개의 썸네일 교체다. 전체 블로그를 한 번에 바꾸는 대신 첫 화면과 추천 글에서 자주 노출되는 글부터 품질을 끌어올린다.

우선 대상은 다음 주제군이다.

- CI/CD 파이프라인과 운영 흐름
- JPA N+1과 데이터베이스 성능
- 외부 API 장애 대응과 fallback 전략
- Spring Boot와 Next.js 캐시 전략
- 테스트 가능한 코드 구조
- React Query와 서버 상태 관리
- API Gateway, CORS, Rate Limiting 같은 백엔드 경계 주제
- 포트폴리오 QA 자동화와 AI 협업 글

## 시각 방향

썸네일 톤은 `dark technical editorial`로 잡는다.

- 딥 네이비, 차콜, 잉크 블랙 계열 배경
- teal, cyan, amber 포인트 컬러
- 글자 중심이 아니라 기술 개념을 시각화한 추상 3D/일러스트/다이어그램 느낌
- 과한 사이버펑크, 장난감 같은 3D, 스톡 이미지 느낌은 피한다.
- 이미지 안 한글 문장은 넣지 않는다. 생성형 이미지의 텍스트 정확도가 낮고 모바일에서 읽기 어렵기 때문이다.

각 글은 제목을 이미지 안에 직접 넣기보다 카드 UI의 제목과 태그가 텍스트 역할을 하게 한다. 썸네일은 글의 주제를 1초 안에 연상시키는 분위기와 구조만 담당한다.

## 모바일 기준

현재 블로그 카드는 `aspect-[16/9]`를 사용한다. 생성 이미지는 이 비율을 기본으로 만들고, 모바일에서도 핵심 오브젝트가 잘리지 않게 중앙 안전 영역을 둔다.

- 핵심 오브젝트는 중앙 60~70% 안에 배치한다.
- 가장자리는 장식, 배경, 흐름선 정도만 둔다.
- 작은 모바일 폭에서도 주제를 알아볼 수 있도록 대비를 높인다.
- 상세 페이지 헤더에서도 같은 이미지가 어색하지 않아야 한다.
- 이미지 안의 세부 텍스트, 작은 코드 조각, 작은 UI 글자는 사용하지 않는다.

검수 뷰포트는 모바일 390px, 모바일 430px, 데스크탑 1440px 이상을 기준으로 한다.

## 자산 저장 전략

생성된 이미지는 프로젝트 정적 자산으로 저장한다.

```text
public/images/blog/generated/
```

배포 후 실제 사용자는 Vercel CDN을 통해 `/images/blog/generated/...` URL로 이미지를 받는다. 따라서 이 방식은 사용자 PC 로컬 파일 의존이 아니라, Git으로 버전 관리되는 영구 정적 자산과 CDN 제공 구조다.

파일명은 글의 `pageId` 또는 안정적인 slug를 사용한다.

```text
public/images/blog/generated/logs-cicd-pipeline.webp
public/images/blog/generated/logs-jpa-n-plus-one.webp
public/images/blog/generated/logs-external-service-failure.webp
```

최종 포맷은 `webp`를 우선한다. 원본 생성물이 png라면 품질을 확인한 뒤 webp로 변환하고, 용량과 선명도를 같이 본다.

## 데이터 연결

글 데이터 원본에 직접 흩뿌려 넣기보다 `pageId` 기준 매핑 레이어를 둔다.

예상 파일:

```text
src/app/(blogLayout)/api/blog-thumbnails.ts
```

역할:

- `pageId`별 영구 썸네일 경로를 반환한다.
- 매핑이 있으면 생성형 썸네일을 우선 사용한다.
- 매핑이 없으면 기존 `thumbnailUrl`을 유지한다.
- 기존 external image 실패 fallback은 안전장치로 유지한다.

이 구조를 쓰면 GitHub logs, GitHub Markdown, Notion 글 모두 같은 방식으로 썸네일을 교체할 수 있다.

## 생성 프롬프트 규칙

프롬프트는 글 제목, 태그, 핵심 주제를 넣되 전체 톤을 고정한다.

공통 규칙:

- 16:9 landscape thumbnail
- dark technical editorial style
- abstract 3D/isometric technical concept
- central safe composition for mobile crop
- no readable text, no watermark, no logo
- professional portfolio tone

예시:

```text
Use case: stylized-concept
Asset type: 16:9 blog thumbnail for a developer portfolio
Primary request: visualize a CI/CD deployment pipeline with test, build, release, and monitoring stages as an abstract technical flow
Style/medium: dark technical editorial, polished 3D/isometric illustration
Composition/framing: key objects centered inside the middle 65% safe area, clean negative space around edges
Lighting/mood: subtle glow, professional, reliable, not flashy
Color palette: deep navy and charcoal with teal and amber accents
Constraints: no readable text, no logos, no watermark, no people
```

## QA 기준

완료 기준은 다음과 같다.

- `/blog` 목록에서 첫 화면 핵심 글 썸네일이 반복 아이콘처럼 보이지 않는다.
- 모바일 390px/430px에서 썸네일 핵심 오브젝트가 잘리지 않는다.
- 상세 페이지 상단 이미지가 어둡게 뭉개지거나 과하게 확대되지 않는다.
- 깨진 이미지가 없다.
- Notion S3 만료 이미지가 사용자에게 노출되는 비율이 줄어든다.
- `next build`가 통과한다.
- 관련 Jest 테스트가 통과한다.
- 공개 배포 후 `https://bocelog.vercel.app/blog`에서 데스크탑/모바일 QA를 다시 수행한다.

## 구현 순서

1. 공개 블로그 목록에서 우선 교체 대상 8~12개 `pageId`, 제목, 태그를 추출한다.
2. 대상별 생성 프롬프트를 작성한다.
3. 생성형 이미지를 만들고 품질 낮은 결과는 재생성한다.
4. 최종 이미지를 `public/images/blog/generated/`에 저장한다.
5. `pageId` 매핑 파일을 추가해 생성형 썸네일을 우선 적용한다.
6. 블로그 목록과 상세 헤더에서 같은 매핑을 사용하도록 데이터 레이어를 정리한다.
7. 모바일/데스크탑 QA와 빌드 검증을 수행한다.
8. 커밋, 푸시, Vercel 배포 후 공개 사이트에서 재검수한다.

## 비범위

- 모든 과거 글의 썸네일을 한 번에 완성하지 않는다.
- 이미지 안에 제목/한글 카피를 넣지 않는다.
- Cloudinary, S3, R2 같은 별도 이미지 저장소는 이번 1차 작업에 도입하지 않는다.
- 블로그 카드 레이아웃 대개편은 이번 작업에 포함하지 않는다. 단, 썸네일 표시 안정성에 필요한 작은 조정은 허용한다.
