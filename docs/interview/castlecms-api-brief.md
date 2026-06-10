# castleCms API 설명 자료

## 세 줄 요약

- `castleCms` API는 관리자 보호 API와 외부 클라이언트 API를 분리해 인증 주체와 수명주기를 다르게 설명합니다.
- 이 문서는 private 저장소의 실제 비밀값 없이 주요 리소스, 요청/응답 형태, 검증 포인트만 면접용으로 정리합니다.
- 면접에서는 API 개수보다 운영자가 어떤 흐름으로 데이터를 관리하고 외부 연동 주체가 어떻게 인증되는지를 중심으로 말합니다.

## API 설계 관점

`castleCms`는 관리자 화면이 사용하는 보호 API와 외부 연동 클라이언트가 사용하는 API를 분리합니다.

- 관리자 API: 로그인한 운영자가 게시글, 미디어, 조직, 사용자, 외부 API 클라이언트를 관리합니다.
- 외부 클라이언트 API: 발급된 API Key를 가진 외부 연동 주체가 허용된 리소스에 접근합니다.
- 인증 흐름: 내부 운영자는 Bearer token, 외부 클라이언트는 API Key 인증 필터를 통과합니다.
- 데이터 흐름: 화면, API 계약, 도메인 모델, 테스트 기준이 같은 리소스 경계를 공유합니다.

## 주요 리소스

| 리소스 | 설명 | 주요 작업 |
| --- | --- | --- |
| Auth | 관리자 로그인과 보호 API 인증 | 로그인, 토큰 검증, 인증 실패 처리 |
| Posts | 게시글 운영 | 목록, 상세, 생성, 수정, 임시저장, 발행 |
| Media | 이미지와 파일 운영 | 업로드, 목록, 게시글 대표 이미지 연결 |
| Organizations | 조직 범위 관리 | 목록, 상세, 사용자 연결 기준 |
| Users | 관리자/운영 사용자 관리 | 목록, 역할, 소속 조직 기준 |
| API Clients | 외부 연동 주체 관리 | 발급, key 해시 저장, 상태 변경, 폐기 |

## 대표 요청/응답 예시

실제 토큰, key, 식별자는 문서에 남기지 않습니다. 아래 예시는 구조 설명용입니다.

### 관리자 로그인

```http
POST /api/admin/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "********"
}
```

```json
{
  "accessToken": "jwt-access-token",
  "admin": {
    "id": 1,
    "email": "admin@example.com",
    "role": "OWNER"
  }
}
```

### 게시글 생성

```http
POST /api/admin/posts
Authorization: Bearer jwt-access-token
Content-Type: application/json

{
  "title": "운영 공지",
  "slug": "ops-notice",
  "status": "DRAFT",
  "seoTitle": "운영 공지",
  "coverMediaId": 12,
  "contentHtml": "<p>본문</p>"
}
```

```json
{
  "id": 100,
  "title": "운영 공지",
  "slug": "ops-notice",
  "status": "DRAFT",
  "updatedAt": "2026-06-10T00:00:00Z"
}
```

### 외부 API 클라이언트 발급

```http
POST /api/admin/api-clients
Authorization: Bearer jwt-access-token
Content-Type: application/json

{
  "name": "partner-service",
  "organizationId": 3,
  "allowedScopes": ["posts:read"]
}
```

```json
{
  "id": 20,
  "name": "partner-service",
  "apiKey": "plain-key-shown-once",
  "status": "ACTIVE",
  "allowedScopes": ["posts:read"]
}
```

응답의 `apiKey`는 발급 직후 한 번만 보여주고, 서버에는 해시로 저장한다고 설명합니다.

### 외부 API 호출

```http
GET /api/external/posts
X-API-Key: issued-api-key
```

```json
{
  "items": [
    {
      "id": 100,
      "title": "운영 공지",
      "slug": "ops-notice"
    }
  ]
}
```

## 오류 응답 기준

| 상황 | 응답 방향 | 설명 포인트 |
| --- | --- | --- |
| 로그인 실패 | `401 Unauthorized` | 인증 정보가 틀린 경우 보호 API 접근 불가 |
| 토큰 없음 | `401 Unauthorized` | 관리자 보호 API는 Bearer token 필수 |
| 권한 부족 | `403 Forbidden` | 역할 또는 조직 범위가 맞지 않는 경우 |
| API Key 없음/폐기 | `401 Unauthorized` | 외부 클라이언트 인증 실패 |
| 리소스 없음 | `404 Not Found` | 식별자가 유효하지 않거나 접근 범위 밖인 경우 |

## 검증 포인트

- 보호 API가 인증 없이 호출될 때 실패하는지 확인합니다.
- 관리자 Bearer token 인증과 외부 API Key 인증을 서로 다른 필터/흐름으로 설명할 수 있어야 합니다.
- API Key는 평문 저장이 아니라 해시 저장과 폐기 흐름을 기준으로 설명합니다.
- 게시글 상태, 대표 이미지, SEO 필드처럼 운영 화면에서 필요한 데이터를 API 계약에 반영했는지 확인합니다.
- 조직/사용자/역할은 실제 서비스 수준의 완전한 권한 매트릭스보다 개인 프로젝트 범위의 접근 경계로 설명합니다.

## 면접 답변 포인트

API를 설명할 때는 엔드포인트 이름을 외우는 방식보다 아래 순서로 말합니다.

1. 운영자가 로그인해 보호 API에 접근합니다.
2. 게시글, 미디어, 조직, 사용자, 외부 클라이언트를 같은 운영 흐름에서 관리합니다.
3. 외부 API 클라이언트는 별도의 API Key 수명주기를 갖습니다.
4. key는 발급 직후 한 번만 보여주고 서버에는 해시로 저장합니다.
5. 테스트와 화면 QA는 인증 실패, 권한 흐름, 주요 리소스 표시가 깨지지 않는지 확인하는 기준으로 둡니다.
