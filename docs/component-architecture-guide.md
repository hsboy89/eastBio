# 🧱 공통 컴포넌트 아키텍처 가이드

> 프로젝트 간 일관성을 위한 재사용 가능한 컴포넌트 구조화 문서

---

## 📋 목차

1. [현재 프로젝트 분석](#현재-프로젝트-분석)
2. [권장 폴더 구조](#권장-폴더-구조)
3. [공통 컴포넌트 분류](#공통-컴포넌트-분류)
4. [디자인 토큰 시스템](#디자인-토큰-시스템)
5. [컴포넌트 템플릿](#컴포넌트-템플릿)
6. [향후 개선 방향](#향후-개선-방향)

---

## 현재 프로젝트 분석

### eastBio 프로젝트 구조

```
src/
├── App.tsx              # 메인 앱 (라우팅, 레이아웃)
├── App.css              # 전역 레이아웃 스타일
├── index.css            # CSS 변수, 리셋, 폰트
├── main.tsx             # 엔트리 포인트
├── components/          # 페이지 컴포넌트들
│   ├── Navigation.tsx   # 상단 네비게이션
│   ├── Hero.tsx         # 히어로 섹션
│   ├── CompanyIntro.tsx # 회사 소개
│   ├── BusinessArea.tsx # 사업 영역
│   ├── Strengths.tsx    # 핵심 역량
│   ├── PartnersNetwork.tsx # 파트너 네트워크
│   └── Contact.tsx      # 연락처 (푸터 역할)
└── lib/
    └── supabase.ts      # 외부 서비스 연동
```

### 현재 패턴 분석

| 패턴 | 설명 | 재사용 가능성 |
|------|------|--------------|
| **섹션 레이아웃** | `.section-container`, `.section-title`, `.section-subtitle` | ⭐⭐⭐ 높음 |
| **카드 컴포넌트** | `intro-card`, `business-card`, `strength-card`, `info-item` | ⭐⭐⭐ 높음 |
| **네비게이션** | 스크롤 감지, 모바일 메뉴, 부드러운 스크롤 | ⭐⭐⭐ 높음 |
| **CSS 변수** | 색상, 그라데이션 시스템 | ⭐⭐⭐ 높음 |
| **버튼 스타일** | `btn-primary`, `btn-secondary` | ⭐⭐⭐ 높음 |

---

## 권장 폴더 구조

### 제안: 레이어드 구조

```
src/
├── app/                     # 앱 설정 및 라우팅
│   ├── App.tsx
│   └── routes/
│
├── components/              # 컴포넌트 레이어
│   │
│   ├── common/              # 🔄 재사용 가능 공통 컴포넌트
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Input/
│   │   └── index.ts         # 배럴 export
│   │
│   ├── layout/              # 📐 레이아웃 컴포넌트
│   │   ├── Navigation/      # 상단 네비게이션
│   │   ├── Footer/          # 하단 푸터
│   │   ├── Sidebar/         # 좌측 사이드바 (필요시)
│   │   ├── Section/         # 섹션 래퍼
│   │   └── Container/       # 컨테이너 래퍼
│   │
│   ├── sections/            # 📄 페이지 섹션 컴포넌트
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Services/
│   │   └── Contact/
│   │
│   └── features/            # 🎯 기능별 컴포넌트
│       ├── auth/
│       ├── dashboard/
│       └── ...
│
├── styles/                  # 🎨 전역 스타일
│   ├── tokens/              # 디자인 토큰
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── animations.css
│   ├── base/                # 기본 스타일
│   │   ├── reset.css
│   │   └── global.css
│   └── index.css            # 스타일 진입점
│
├── hooks/                   # 커스텀 훅
│   ├── useScroll.ts
│   ├── useMediaQuery.ts
│   └── useImagePreload.ts
│
├── lib/                     # 외부 서비스, 유틸리티
│   ├── api/
│   └── utils/
│
└── assets/                  # 정적 자원
    ├── images/
    ├── icons/
    └── fonts/
```

---

## 공통 컴포넌트 분류

### 1. 레이아웃 컴포넌트 (Layout)

#### Navigation (상단 네비게이션)
```typescript
// 현재 eastBio에서 추출 가능한 패턴
interface NavigationProps {
  logo: string | React.ReactNode
  items: { id: string; label: string; href?: string }[]
  sticky?: boolean
  transparent?: boolean
  mobileBreakpoint?: number
}
```

**재사용 포인트:**
- 스크롤 시 배경색 변경 로직
- 모바일 햄버거 메뉴
- 부드러운 스크롤 네비게이션

#### Footer (하단 푸터)
```typescript
interface FooterProps {
  companyName: string
  contactInfo?: ContactInfo
  socialLinks?: SocialLink[]
  copyright?: string
}
```

#### Section (섹션 래퍼)
```typescript
interface SectionProps {
  id: string
  title?: string
  subtitle?: string
  backgroundImage?: string
  children: React.ReactNode
  className?: string
}
```

**현재 코드에서 추출:**
```css
/* App.css의 공통 섹션 스타일 */
.section-container { ... }
.section-title { ... }
.section-subtitle { ... }
```

---

### 2. UI 컴포넌트 (Common)

#### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}
```

**현재 eastBio 버튼 스타일:**
```css
.btn-primary { /* Hero.css */ }
.btn-secondary { /* Hero.css */ }
```

#### Card
```typescript
interface CardProps {
  variant: 'intro' | 'business' | 'strength' | 'info'
  icon?: string | React.ReactNode
  title: string
  description?: React.ReactNode
  features?: string[]
  stats?: string
  hoverable?: boolean
  children?: React.ReactNode
}
```

**통합 가능한 현재 카드들:**
- `IntroCard` (CompanyIntro.tsx)
- `BusinessCard` (BusinessArea.tsx)
- `StrengthCard` (Strengths.tsx)
- `ContactInfoItem` (Contact.tsx)

#### Modal
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  children: React.ReactNode
}
```

#### Input / Form Elements
```typescript
interface InputProps {
  type: 'text' | 'email' | 'tel' | 'textarea'
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
}
```

---

### 3. 기능 컴포넌트 (Features)

#### Hero
```typescript
interface HeroProps {
  title: React.ReactNode
  subtitle?: string
  backgroundImage?: string
  ctaButtons?: { label: string; onClick: () => void; variant: 'primary' | 'secondary' }[]
  scrollIndicator?: boolean
}
```

#### StatsDisplay
```typescript
interface StatsDisplayProps {
  items: { value: string; label: string }[]
  layout?: 'horizontal' | 'grid'
}
```

---

## 디자인 토큰 시스템

### 색상 토큰 (colors.css)

```css
:root {
  /* 브랜드 색상 - 프로젝트별 오버라이드 */
  --color-primary: #1a5f3f;
  --color-primary-light: #2d8f5f;
  --color-primary-dark: #144a31;
  
  --color-secondary: #2d8f5f;
  --color-accent: #4fc3a1;
  
  /* 중립 색상 - 공통 */
  --color-text-dark: #1a1a1a;
  --color-text-light: #666666;
  --color-text-muted: #999999;
  
  --color-bg-white: #ffffff;
  --color-bg-light: #f8f9fa;
  --color-bg-dark: #1a1a1a;
  
  /* 그라데이션 */
  --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  --gradient-accent: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%);
  
  /* 상태 색상 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### 타이포그래피 토큰 (typography.css)

```css
:root {
  /* 폰트 패밀리 */
  --font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading: var(--font-primary);
  
  /* 폰트 크기 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
  --text-5xl: 3rem;      /* 48px */
  
  /* 폰트 굵기 */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* 줄 높이 */
  --leading-tight: 1.25;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;
}
```

### 간격 토큰 (spacing.css)

```css
:root {
  /* 간격 스케일 */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* 컨테이너 */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --container-2xl: 1400px;
  
  /* 섹션 패딩 */
  --section-padding-y: 120px;
  --section-padding-y-mobile: 80px;
  
  /* 보더 라디우스 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 15px;
  --radius-xl: 20px;
  --radius-2xl: 25px;
  --radius-full: 9999px;
}
```

### 애니메이션 토큰 (animations.css)

```css
:root {
  /* 트랜지션 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.6s ease;
  
  /* 이징 */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 공통 hover 효과 */
.hover-lift {
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.hover-scale {
  transition: transform var(--transition-normal);
}
.hover-scale:hover {
  transform: scale(1.02);
}
```

---

## 컴포넌트 템플릿

### 새 프로젝트 시작 체크리스트

```
□ 1. 프로젝트 초기화 (Vite + React + TypeScript)
□ 2. 폴더 구조 생성
□ 3. 디자인 토큰 설정 (colors, typography, spacing)
□ 4. 공통 컴포넌트 복사/생성
     □ Button
     □ Card
     □ Section
     □ Navigation
     □ Footer
□ 5. 브랜드 색상 커스터마이징
□ 6. 페이지별 섹션 컴포넌트 생성
```

### 권장 의존성

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "react-helmet-async": "^2.x",
    "lenis": "^1.x"
  }
}
```

---

## 향후 개선 방향

### 단기 목표 (1-2주)

1. **공통 컴포넌트 패키지 만들기**
   - `@myorg/ui-components` 또는 별도 공유 폴더
   - 현재 eastBio에서 추출

2. **디자인 토큰 표준화**
   - CSS 변수 파일 분리
   - 프로젝트별 테마 오버라이드 지원

3. **컴포넌트 문서화**
   - Storybook 고려 (선택사항)
   - 간단한 사용법 README

### 중기 목표 (1-2개월)

1. **프로젝트 템플릿 생성**
   ```bash
   npx create-my-app project-name
   ```
   - 기본 폴더 구조 포함
   - 공통 컴포넌트 사전 설정

2. **훅 라이브러리 구축**
   - `useScroll` - 스크롤 감지
   - `useMediaQuery` - 반응형 감지
   - `useImagePreload` - 이미지 프리로딩

3. **애니메이션 프리셋**
   - Framer Motion variants 표준화
   - 일관된 페이드인/슬라이드 효과

### 장기 목표 (3개월+)

1. **컴포넌트 라이브러리화**
   - npm 패키지로 배포
   - 버전 관리

2. **CLI 도구 개발**
   - 컴포넌트 자동 생성
   - 프로젝트 스캐폴딩

---

## 참고: 현재 프로젝트에서 즉시 분리 가능한 항목

| 파일/코드 | 분리 대상 | 우선순위 |
|----------|----------|---------|
| `index.css` 내 `:root` 변수 | `styles/tokens/` | ⭐⭐⭐ |
| `App.css` 섹션 스타일 | `components/layout/Section/` | ⭐⭐⭐ |
| `Navigation.tsx` | `components/layout/Navigation/` | ⭐⭐⭐ |
| Hero 버튼 스타일 | `components/common/Button/` | ⭐⭐ |
| 각 카드 컴포넌트 | `components/common/Card/` | ⭐⭐ |
| Lenis 스크롤 설정 | `hooks/useSmoothScroll.ts` | ⭐ |
| 이미지 프리로드 로직 | `hooks/useImagePreload.ts` | ⭐ |

---

> 📌 **다음 단계**: 새 프로젝트 시작 시 이 문서를 참고하여 공통 컴포넌트부터 구축하세요.
