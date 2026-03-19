# Nexus Command Center

## 프로젝트 개요

- **프로젝트명**: nexus-command-center
- **설명**: 멀티 솔루션 클라우드 플랫폼 (Azure/AWS/GCP 스타일). "Nexus"라는 이름으로 여러 솔루션을 연결하는 플랫폼 셸 위에 솔루션을 추가하는 구조. "Command Center"는 대시보드 허브 역할
- **기술 스택**: Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS v4, shadcn/ui (base-nova)
- **주요 의존성**: lucide-react (아이콘), @base-ui/react (UI 프리미티브), class-variance-authority, tailwind-merge

## 빌드 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트
pnpm lint
```

## 테스트

```bash
# (테스트 프레임워크 미설정 — 추후 추가)
```

## 코드 스타일

- TypeScript strict 모드 사용
- ESLint (eslint-config-next) 준수
- shadcn/ui 컴포넌트는 `@base-ui/react` 기반 — `asChild` 대신 `render` prop + `nativeButton={false}` 사용
- Tailwind CSS v4: `@theme inline` 블록으로 테마 정의 (tailwind.config.ts 없음)
- 상세 규칙은 `.claude/rules/code-style.md` 참조

## 프로젝트 구조

```markdown
src/
├── app/ # Next.js App Router 페이지
│ ├── layout.tsx # 루트 레이아웃 (PlatformShell 적용)
│ ├── page.tsx # Command Center 대시보드 (/)
│ ├── not-found.tsx # 커스텀 404
│ ├── globals.css # Tailwind + shadcn 테마 변수
│ ├── solutions/
│ │ ├── page.tsx # 솔루션 카탈로그 (/solutions)
│ │ └── [slug]/
│ │ ├── layout.tsx # 솔루션 상세 레이아웃
│ │ └── page.tsx # 솔루션 상세 (/solutions/[slug])
│ └── settings/
│ └── page.tsx # 설정 (플레이스홀더)
├── components/
│ ├── layout/ # 플랫폼 셸 컴포넌트
│ │ ├── header.tsx # 상단 헤더 (로고, 검색, 사용자 메뉴)
│ │ ├── sidebar.tsx # 데스크톱 사이드바 (접기/펼치기)
│ │ ├── mobile-sidebar.tsx # 모바일 Sheet 사이드바
│ │ ├── breadcrumbs.tsx # 경로 탐색
│ │ └── platform-shell.tsx # 셸 래퍼 (상태 관리)
│ ├── solutions/ # 솔루션 관련 컴포넌트
│ │ ├── solution-card.tsx
│ │ ├── solution-grid.tsx
│ │ └── category-filter.tsx
│ └── ui/ # shadcn/ui 컴포넌트
├── config/
│ └── solutions.ts # 솔루션 레지스트리 (확장 포인트)
├── types/
│ └── solution.ts # Solution, Category 타입
└── lib/
├── utils.ts # cn() 유틸리티
└── icons.tsx # 동적 아이콘 매핑
```

## 중요 컨텍스트

- **브랜드**: 플랫폼명 "Nexus", 대시보드 "Command Center"
- **솔루션 추가 방법**: `src/config/solutions.ts`의 `solutions` 배열에 항목을 추가하면 카탈로그, 사이드바, 상세 페이지에 자동 반영
- **등록 솔루션**: Codex (active, 데이터 거버넌스), AI Factory, Data Pipeline, CI/CD Hub, Insight Dashboard, LLM Gateway
- **아키텍처**: 모놀리식 SPA — 셸과 솔루션이 하나의 Next.js 앱에 공존. 추후 마이크로프론트엔드 마이그레이션 고려
- **인증**: 미구현 (플레이스홀더만 존재)
- **shadcn/ui 스타일**: `base-nova` (Radix가 아닌 @base-ui/react 기반)
