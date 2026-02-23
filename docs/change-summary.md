# 변경 요약

## 라우팅/레이아웃
- `src/App.tsx`
  - `/renew` 라우트 추가
  - `/login`은 `Layout` 내부에서 렌더
- `src/components/layout/Layout.tsx`
  - `/login` 페이지에서 `Footer` 숨김

## API/인증 공통
- `src/api/client.ts`
  - API 기본 URL 고정: `https://zerone01.kr/api/v1/`
  - refresh URL도 동일 베이스로 통일
- `src/api/auth.ts`
  - `getProfile()` 추가 (`GET /auth/profile`)
  - `logout()` 추가 (`POST /auth/logout`)

## 타입 확장
- `src/types/Auth.ts`
  - `AuthProfile` 상세 확장
  - 추가 타입:
    - `DuesStatus`
    - `ActivitySemester`
    - `CurrentSemester`
    - `StudyHistory`
- `src/types/Google.ts`
  - Google 버튼 렌더 옵션에 `width` 추가

## 로그인 페이지/구글 로그인
- `src/pages/LoginPage.tsx`
  - Google 기본 버튼(`renderButton`) 방식으로 전환
  - 스크립트 로딩 지연 대응(재시도 렌더)
  - 로그인 상태에서 `/login` 접근 시 `/` 리디렉트
  - 안내 문구 추가: `한양대 이메일로 로그인해주세요`
- `src/api/google.ts`
  - `renderGoogleButton({ elementId, theme, size, width })` 지원

## 토큰/사용자 정보 저장
- `src/hooks/useLogin.ts`
  - 토큰 저장: `sessionStorage.accessToken`으로 통일
  - `idToken` 디코딩 후 `authUserName`, `authUserImage` 저장
- `src/hooks/useMigration.ts`
  - 마이그레이션 성공 시 `sessionStorage.accessToken` 저장

## 헤더/프로필 UI
- `src/components/layout/Header.tsx`
  - 네비 메뉴에서 `컴파일러` 제거
  - 비로그인: `로그인/회원가입` 표시
  - 로그인: 이름+프로필(한 버튼) 표시
  - 클릭 시 GitHub 느낌 드롭다운 모달:
    - 이름, 학번, 학과, 기수, 백준ID
    - 학회비 상태, 현재 학기
    - 활동 학기
    - 수강중 스터디 / 전체 스터디
    - 로그아웃 버튼
  - 모바일 햄버거 메뉴에도 동일 상세 정보 표시
  - 모바일 메뉴 스크롤 가능(`overflow-y-auto`)

## 메인 CTA 분기
- `src/hooks/useMainCta.ts` (신규)
  - 프로필 기반 CTA 계산:
    - 비로그인: `JOIN`
    - 로그인 + 미가입/미납/확인대기: `RENEW`
    - 로그인 + 납부완료/명예회원: `NONE`
- `src/components/sections/MainPage/Hero.tsx`
- `src/components/sections/MainPage/MobileHero.tsx`
  - `JOIN` → `가입하기` (`/login`)
  - `RENEW` → `갱신하기` (외부 renew URL)
  - `NONE` → 버튼 미표시

## renew 외부 리디렉트
- `src/constants/urls.ts` (신규)
  - `RENEW_REDIRECT_URL` 정의
  - `VITE_RENEW_REDIRECT_URL` 우선, 없으면 `https://zerone01.kr/renew`
- `src/pages/RenewPage.tsx` (신규)
  - `/renew` 진입 시 외부 URL로 즉시 리디렉트 (`window.location.replace`)
