---
paths:
  - "solutions/**"
---

# 솔루션 개발 규칙

## 참조 문서

새 솔루션 추가 시 `docs/solution-development-guide.md`의 Step 1~7을 따릅니다.

## 디렉토리 구조

각 솔루션은 반드시 아래 구조를 따릅니다:

```
solutions/{id}/
├── web/          # Next.js 앱 (@nexus/{id}-web)
├── models/       # 데이터 모델 (@nexus/{id}-models)
├── shared/       # 내부 공유 유틸 (@nexus/{id}-shared)
└── docs/         # 솔루션 문서
```

## 솔루션 등록

- 솔루션 메타데이터는 `packages/config/src/solutions.ts`의 `solutions` 배열에 등록
- `route` 값과 `web/next.config.ts`의 `basePath` 일치 필수
- `category`는 같은 파일의 `categories` 배열에 정의된 ID 사용

## 레이아웃 패턴

- `web/src/app/layout.tsx`에서 `PlatformShell`로 children을 래핑
- `TooltipProvider > PlatformShell > {children}` 순서 유지
- metadata의 title 형식: `"{name} — Nexus"`

## 의존성 규칙

- 플랫폼 패키지: `@nexus/shell`, `@nexus/ui`, `@nexus/config`, `@nexus/types`
- 솔루션 내부 패키지: `@nexus/{id}-models`, `@nexus/{id}-shared`
- 다른 솔루션 패키지 의존 금지

## 포트 할당

- platform: 3000, codex: 3001, 이후 솔루션: 3002~
- `web/package.json`의 `dev` 스크립트에 `--port {port}` 지정
