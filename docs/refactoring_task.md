# 프로젝트 구조 리팩토링

## 목표
eastBio 프로젝트를 제안된 레이어드 구조로 재구성

## 작업 목록

### 1. 폴더 구조 생성
- [/] `src/components/common/` 생성
- [/] `src/components/layout/` 생성
- [/] `src/components/sections/` 생성
- [/] `src/styles/tokens/` 생성
- [/] `src/styles/base/` 생성
- [/] `src/hooks/` 생성

### 2. 스타일 토큰 분리
- [ ] `colors.css` 생성 (색상 변수)
- [ ] `typography.css` 생성 (폰트 변수)
- [ ] `spacing.css` 생성 (간격 변수)
- [ ] `animations.css` 생성 (애니메이션 변수)
- [ ] `reset.css` 생성 (리셋 스타일)
- [ ] `global.css` 생성 (전역 스타일)
- [ ] `styles/index.css` 생성 (진입점)

### 3. 공통 컴포넌트 분리
- [ ] `Button/` 컴포넌트 생성
- [ ] `Card/` 컴포넌트 생성
- [ ] `common/index.ts` 배럴 export 생성

### 4. 레이아웃 컴포넌트 이동
- [ ] `Navigation/` 이동 및 구조화
- [ ] `Section/` 컴포넌트 생성
- [ ] `Container/` 컴포넌트 생성
- [ ] `layout/index.ts` 배럴 export 생성

### 5. 섹션 컴포넌트 이동
- [/] `Hero/` 이동
- [/] `CompanyIntro/` 이동
- [/] `BusinessArea/` 이동
- [/] `Strengths/` 이동
- [/] `PartnersNetwork/` 이동
- [/] `Contact/` 이동
- [/] `sections/index.ts` 배럴 export 생성

### 6. 커스텀 훅 분리
- [/] `useSmoothScroll.ts` 생성
- [/] `useImagePreload.ts` 생성
- [/] `hooks/index.ts` 배럴 export 생성

### 7. App.tsx 업데이트
- [/] 새 import 경로로 변경
- [/] 훅 적용

### 8. 정리 및 검증
- [/] 기존 파일 삭제
- [/] 빌드 테스트
- [/] 동작 확인
