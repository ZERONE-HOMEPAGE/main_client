# 📝 개발자 노트 (Developer Notes)

## 🚨 중요 알림
- **설정 파일 수정 금지**: eslint.config.js, postcss.config.js, tailwind.config.js 등 설정 파일은 수정하지 말아주세요.
- **브랜치 전략**: Git Flow 방식을 따라주세요 (main → develop → feature/)

## 🛠️ 개발 환경 설정 시 주의사항
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🏗️ 프로젝트 구조
```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── assets/        # 이미지, 폰트 등 정적 파일
├── styles/        # CSS/Tailwind 관련 파일
└── utils/         # 유틸리티 함수
```

## 🐛 알려진 이슈
- 현재 알려진 중대한 이슈 없음

## 📋 개발 중 참고사항

### 스타일링
- **Tailwind CSS** 사용
- 반응형 디자인 필수 (모바일 우선)
- 일관된 컬러 팔레트 사용

### 컴포넌트 작성 가이드
- **TypeScript** 필수 사용
- 함수형 컴포넌트 사용
- Props 타입 정의 필수

### 성능 최적화
- 이미지 최적화 필수 (WebP 사용 권장)
- 불필요한 리렌더링 방지
- 코드 스플리팅 고려

## 🚀 배포 관련
- **환경**: Vite 빌드 시스템 사용
- **빌드 명령**: `npm run build`
- **빌드 결과물**: `dist/` 폴더

## 📚 추가 자료
- [노션 페이지](https://www.notion.so/0-1-233387bfdae48033a188e649cd1ffe57?source=copy_link)
- Tailwind CSS 공식 문서
- React + TypeScript 모범 사례

## 💡 팁 & 트릭
1. **개발 서버가 느릴 때**: `node_modules` 삭제 후 `npm install` 재실행
2. **타입 에러**: `tsconfig.json` 설정 확인
3. **스타일이 적용되지 않을 때**: Tailwind 클래스명 오타 확인

## 📞 도움이 필요할 때
- 팀 노션 페이지 확인
- Git 이슈 생성
- 코드 리뷰 요청

---
*이 문서는 지속적으로 업데이트됩니다. 새로운 이슈나 팁을 발견하면 추가해주세요!*