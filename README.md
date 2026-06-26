# castle-portfolio

# 포트폴리오 준비.

1. 단일 페이지 -> 노션 스타일 -> 히스토리 위주 -> 상세
2. vercel 자동배포 -> 깃헙 액션으로 변경
3. 슬랙 webhook 추가
4. 카테고리 생성
5. Google Analytics / AdSense 운영 준비(AdSense 사이트 심사중)
6. git config 테스트

---

## 📁 프로젝트 폴더 구조

```
/src
  ├── app/                # Next.js 13+ app 라우팅, 레이아웃, 글로벌 스타일 등
  ├── components/         # UI 컴포넌트 (Navbar, Blog, Footer 등)
  │     └── config/       # 컴포넌트별 설정/데이터
  ├── common/             # 공통적으로 쓰이는 단순 컴포넌트
  ├── constants/          # 상수 관리
  ├── hooks/              # 커스텀 React 훅
  ├── store/              # 상태 관리 (예: zustand 등)
  ├── utils/              # 유틸리티 함수
  │     └── types/        # (유틸 관련 타입, 현재 비어 있음)
  ├── styles/             # 스타일 관련 파일 (현재 비어 있음)
  └── globals.d.ts        # 글로벌 타입 정의
/public                   # 정적 파일
/__tests__/               # 테스트 코드
/coverage/                # 테스트 커버리지
node_modules/             # 의존성 모듈
tailwind.config.ts        # Tailwind CSS 설정
next.config.ts            # Next.js 설정
tsconfig.json             # TypeScript 설정
package.json              # 패키지 관리
README.md                 # 프로젝트 설명
```
