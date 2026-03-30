# eastBio 프로젝트 레이어드 구조 리팩토링 계획

프로젝트를 재사용 가능한 레이어드 구조로 재구성합니다.

---

## 현재 구조 → 목표 구조

```
현재:                           목표:
src/                            src/
├── App.tsx                     ├── App.tsx (수정)
├── App.css                     ├── components/
├── index.css                   │   ├── common/
├── main.tsx                    │   │   ├── Button/
├── components/                 │   │   └── Card/
│   ├── Navigation.tsx/css      │   ├── layout/
│   ├── Hero.tsx/css           │   │   ├── Navigation/
│   ├── CompanyIntro.tsx/css   │   │   └── Section/
│   ├── BusinessArea.tsx/css   │   └── sections/
│   ├── Strengths.tsx/css      │       ├── Hero/
│   ├── PartnersNetwork.tsx/css│       ├── CompanyIntro/
│   ├── Contact.tsx/css        │       ├── BusinessArea/
│   └── Prism.tsx/css          │       ├── Strengths/
└── lib/                        │       ├── PartnersNetwork/
    └── supabase.ts             │       └── Contact/
                                ├── styles/
                                │   ├── tokens/
                                │   │   ├── colors.css
                                │   │   ├── typography.css
                                │   │   ├── spacing.css
                                │   │   └── animations.css
                                │   ├── base/
                                │   │   ├── reset.css
                                │   │   └── global.css
                                │   └── index.css
                                ├── hooks/
                                │   ├── useSmoothScroll.ts
                                │   └── useImagePreload.ts
                                ├── lib/ (유지)
                                └── main.tsx (수정)
```

---

## Proposed Changes

### 1. 스타일 토큰 시스템 생성

#### [NEW] [colors.css](file:///d:/SideProject/eastBio/src/styles/tokens/colors.css)
- 현재 `index.css`의 `:root` 색상 변수를 분리
- 브랜드 색상, 중립 색상, 그라데이션 정의

#### [NEW] [typography.css](file:///d:/SideProject/eastBio/src/styles/tokens/typography.css)
- 폰트 패밀리, 크기, 굵기 변수 정의

#### [NEW] [spacing.css](file:///d:/SideProject/eastBio/src/styles/tokens/spacing.css)
- 간격 스케일, 컨테이너, 보더 라디우스 변수 정의

#### [NEW] [animations.css](file:///d:/SideProject/eastBio/src/styles/tokens/animations.css)
- 트랜지션, 이징, 공통 hover 효과 정의

---

#### [NEW] [reset.css](file:///d:/SideProject/eastBio/src/styles/base/reset.css)
- CSS 리셋 스타일 분리

#### [NEW] [global.css](file:///d:/SideProject/eastBio/src/styles/base/global.css)
- `body`, `html`, 스크롤바 스타일 분리

#### [NEW] [index.css](file:///d:/SideProject/eastBio/src/styles/index.css)
- 모든 토큰과 베이스 스타일을 import하는 진입점

---

### 2. 공통 컴포넌트 생성

#### [NEW] [Button.tsx](file:///d:/SideProject/eastBio/src/components/common/Button/Button.tsx)
- `Hero.css`의 버튼 스타일을 재사용 가능한 컴포넌트로 추출
- `variant`: primary, secondary, outline
- `size`: sm, md, lg

#### [NEW] [Button.css](file:///d:/SideProject/eastBio/src/components/common/Button/Button.css)
- 버튼 스타일 분리

#### [NEW] [Card.tsx](file:///d:/SideProject/eastBio/src/components/common/Card/Card.tsx)
- 범용 카드 컴포넌트 (현재 각 섹션의 카드들은 그대로 유지, 향후 통합용)

---

### 3. 레이아웃 컴포넌트 이동

#### [MOVE] Navigation.tsx → [Navigation/Navigation.tsx](file:///d:/SideProject/eastBio/src/components/layout/Navigation/Navigation.tsx)
- import 경로만 변경, 코드는 그대로 유지

#### [NEW] [Section.tsx](file:///d:/SideProject/eastBio/src/components/layout/Section/Section.tsx)
- `App.css`의 섹션 스타일을 컴포넌트화
- props: `id`, `title`, `subtitle`, `backgroundImage`, `children`

---

### 4. 섹션 컴포넌트 이동

각 컴포넌트를 개별 폴더로 이동 (코드 변경 없음, 경로만 변경):

| 현재 | 목표 |
|------|------|
| `Hero.tsx` | `sections/Hero/Hero.tsx` |
| `Hero.css` | `sections/Hero/Hero.css` |
| `CompanyIntro.tsx` | `sections/CompanyIntro/CompanyIntro.tsx` |
| `CompanyIntro.css` | `sections/CompanyIntro/CompanyIntro.css` |
| `BusinessArea.tsx` | `sections/BusinessArea/BusinessArea.tsx` |
| `BusinessArea.css` | `sections/BusinessArea/BusinessArea.css` |
| `Strengths.tsx` | `sections/Strengths/Strengths.tsx` |
| `Strengths.css` | `sections/Strengths/Strengths.css` |
| `PartnersNetwork.tsx` | `sections/PartnersNetwork/PartnersNetwork.tsx` |
| `PartnersNetwork.css` | `sections/PartnersNetwork/PartnersNetwork.css` |
| `Contact.tsx` | `sections/Contact/Contact.tsx` |
| `Contact.css` | `sections/Contact/Contact.css` |

---

### 5. 커스텀 훅 분리

#### [NEW] [useSmoothScroll.ts](file:///d:/SideProject/eastBio/src/hooks/useSmoothScroll.ts)
- `App.tsx`의 Lenis 스크롤 로직 추출

#### [NEW] [useImagePreload.ts](file:///d:/SideProject/eastBio/src/hooks/useImagePreload.ts)
- `App.tsx`와 `Hero.tsx`의 이미지 프리로드 로직 추출

---

### 6. 진입점 파일 수정

#### [MODIFY] [App.tsx](file:///d:/SideProject/eastBio/src/App.tsx)
- import 경로를 새 구조에 맞게 수정
- Lenis 로직을 `useSmoothScroll` 훅으로 대체
- 이미지 프리로드 로직을 `useImagePreload` 훅으로 대체

#### [MODIFY] [main.tsx](file:///d:/SideProject/eastBio/src/main.tsx)
- import 경로를 `./styles/index.css`로 변경

---

### 7. 배럴 Export 파일 생성

#### [NEW] [index.ts](file:///d:/SideProject/eastBio/src/components/common/index.ts)
```typescript
export { Button } from './Button/Button'
export { Card } from './Card/Card'
```

#### [NEW] [index.ts](file:///d:/SideProject/eastBio/src/components/layout/index.ts)
```typescript
export { Navigation } from './Navigation/Navigation'
export { Section } from './Section/Section'
```

#### [NEW] [index.ts](file:///d:/SideProject/eastBio/src/components/sections/index.ts)
```typescript
export { Hero } from './Hero/Hero'
export { CompanyIntro } from './CompanyIntro/CompanyIntro'
// ... 기타 섹션들
```

#### [NEW] [index.ts](file:///d:/SideProject/eastBio/src/hooks/index.ts)
```typescript
export { useSmoothScroll } from './useSmoothScroll'
export { useImagePreload } from './useImagePreload'
```

---

### 8. 기존 파일 삭제

- `src/index.css` → 삭제 (styles/index.css로 대체)
- `src/App.css` → 삭제 (styles/base/global.css로 병합)
- `src/components/*.tsx` → 삭제 (sections/으로 이동 완료 후)
- `src/components/*.css` → 삭제 (sections/으로 이동 완료 후)

---

## Verification Plan

### 자동 테스트
현재 프로젝트에 테스트 파일이 없으므로 빌드 테스트로 검증합니다.

```bash
# 빌드 테스트
npm run build
```

### 수동 검증

1. **개발 서버 실행 확인**
   ```bash
   npm run dev
   ```
   - 브라우저에서 `http://localhost:5173` 접속
   - 콘솔 에러 없이 페이지 로드 확인

2. **각 섹션 렌더링 확인**
   - Hero 섹션 표시 확인
   - 스크롤 시 각 섹션(회사소개, 사업영역, 핵심역량, 파트너, 연락처) 정상 표시
   - 네비게이션 클릭 시 해당 섹션으로 이동

3. **스타일 적용 확인**
   - 색상, 폰트, 간격이 이전과 동일하게 적용
   - 모바일 반응형 확인 (브라우저 크기 조절)

4. **애니메이션 동작 확인**
   - Lenis 스무스 스크롤 동작
   - hover 효과 동작

---

## 작업 순서

1. 새 폴더 구조 생성
2. 스타일 토큰 파일 생성
3. 공통 컴포넌트 생성
4. 레이아웃 컴포넌트 이동
5. 섹션 컴포넌트 이동
6. 커스텀 훅 생성
7. 배럴 export 파일 생성
8. App.tsx, main.tsx 수정
9. 기존 파일 삭제
10. 빌드 및 동작 검증

---

> ⚠️ **주의사항**: 이 작업은 파일 이동과 import 경로 변경이 주요 내용이며, 실제 컴포넌트 로직은 변경하지 않습니다.
