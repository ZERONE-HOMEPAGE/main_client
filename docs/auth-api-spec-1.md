# 인증 API 연동 명세 (프론트엔드)

v3 스펙 기준, 변경사항: refreshToken → httpOnly 쿠키, Google 로그인 → 클라이언트 SDK

---

## 전체 플로우

```
로그인 버튼 클릭
  → Google 팝업 (Google Identity Services SDK, 백엔드 콜백 없음)
  → idToken 획득 + 프론트에서 디코딩 (이름/학과 자동 채움용)
  → POST /api/v1/auth/login { idToken }
    → 200: ACTIVE 회원 → accessToken 저장 → 메인 페이지
    → 403 (PENDING): "승인 대기 중" 안내
    → 403 (REJECTED/SUSPENDED): 상태별 안내 메시지
    → 401: 미가입 → 회원가입 페이지 (파싱한 정보로 폼 자동 채움)
      → POST /api/v1/auth/register { idToken, studentId, name, email, department, ... }
      → 201: "승인 대기" 안내 → 로그인 페이지로 이동
```

---

## v3 → 현재 변경 사항

| 항목          | v3 (기존)                       | 현재 (변경)                               |
| ------------- | ------------------------------- | ----------------------------------------- |
| refreshToken  | body로 전달, 프론트가 저장/관리 | httpOnly 쿠키, 서버가 Set-Cookie로 관리   |
| refresh 요청  | body에 refreshToken 담아서 전송 | body 없음, 쿠키 자동 전송                 |
| logout 요청   | body에 refreshToken 담아서 전송 | body 없음, 쿠키 자동 전송                 |
| Google 로그인 | idToken 획득 방식 미정          | Google Identity Services SDK (클라이언트) |
| 폼 자동 채움  | 없음                            | idToken 디코딩하여 이름/학과 프론트 파싱  |

---

## 1. 로그인

### `POST /api/v1/auth/login`

#### Request

```json
{
  "idToken": "Google ID Token"
}
```

#### Response 200

```json
{
  "accessToken": "eyJhbGciOi..."
}
```

> refreshToken은 Set-Cookie httpOnly 쿠키로 내려줌 (v3 변경: body → 쿠키)

#### 에러 (공통 에러 스키마)

```json
{
  "code": "403",
  "message": "계정이 승인 대기 중입니다",
  "status": "PENDING"
}
```

| 상태 | 의미                                                            |
| ---- | --------------------------------------------------------------- |
| 400  | 잘못된 요청 (형식 오류)                                         |
| 401  | 유효하지 않은 idToken / 미가입 사용자                           |
| 403  | PENDING: 승인 대기 / REJECTED: 가입 거절 / SUSPENDED: 이용 정지 / WITHDRAW: 탈퇴 |

#### 프론트 처리

1. Google Identity Services SDK로 팝업 → `response.credential`이 idToken
   ```ts
   google.accounts.id.initialize({
     client_id: 'GOOGLE_CLIENT_ID',
     callback: (response) => {
       const idToken = response.credential;
     },
   });
   ```
2. idToken 디코딩하여 유저 정보 파싱 (회원가입 폼 자동 채움용)
   ```ts
   const payload = JSON.parse(atob(idToken.split('.')[1]));
   const [name, university, department] = payload.name.split('|');
   ```
3. `POST /api/v1/auth/login` 호출
4. 200 → accessToken을 sessionStorage에 저장 → 메인 페이지 이동
5. 403 → `status` 값에 따라 안내 메시지 표시
6. 401 (미가입) → 회원가입 페이지로 이동 (파싱한 정보 + idToken 들고감)

---

## 2. 회원가입

### `POST /api/v1/auth/register`

#### Request

| 필드        | 타입   | 필수 | 설명                                      |
| ----------- | ------ | ---- | ----------------------------------------- |
| idToken     | String | O    | Google ID Token                           |
| studentId   | String | O    | 학번 (10자리 정수)                        |
| name        | String | O    | 이름 (2자 이상)                           |
| email       | String | O    | 한양대 이메일 (idToken 이메일과 일치해야) |
| department  | String | O    | 학과 (2자 이상)                           |
| phoneNumber | String | O    | 전화번호                                  |
| baekjoonId  | String |      | 백준 아이디 (선택)                        |

```json
{
  "idToken": "eyJhbGciOi...",
  "studentId": "2025000000",
  "name": "목정빈",
  "email": "user@hanyang.ac.kr",
  "department": "컴퓨터학부",
  "phoneNumber": "010-1234-5678",
  "baekjoonId": "baekjoon123"
}
```

> name, department는 idToken에서 파싱하여 자동 채움(프론트에서 처리)
> `"목정빈|한양대|컴퓨터학부"` → name="목정빈", department="컴퓨터학부"

#### Response 201

```json
{
  "message": "회원가입 신청이 완료되었습니다. 관리자 승인 후 로그인 가능합니다.",
  "userId": "uuid-string",
  "status": "PENDING"
}
```

> 회원가입 후 바로 로그인 불가. 관리자 승인(ACTIVE) 후 로그인 가능.

#### 에러

| 상태 | 의미                                             |
| ---- | ------------------------------------------------ |
| 400  | 필수정보 누락 / 형식 오류 / idToken-email 불일치 |
| 403  | 한양대 이메일이 아님                             |
| 409  | 이미 가입된 사용자 (REJECTED만 신청 허용)        |

#### 프론트 처리

1. 회원가입 폼에 파싱한 정보 자동 채움 (name, department)
2. 나머지 필드 입력 (studentId, phoneNumber, baekjoonId)
3. `POST /api/v1/auth/register` 호출
4. 201 → "관리자 승인 대기" 안내 → 로그인 페이지로 이동

---

## 3. 토큰 재발급 (자동)

### `POST /api/v1/auth/refresh`

> 직접 호출하지 않음. axios 인터셉터가 401 시 자동 처리.

#### Request

- body 없음 (v3 변경: refreshToken body → 쿠키 자동 전송)
- `withCredentials: true`

#### Response 200

```json
{
  "accessToken": "새 accessToken"
}
```

> 새 refreshToken도 Set-Cookie로 함께 내려줌 (Rotation)

#### 프론트 처리 (인터셉터)

1. API 응답 401 수신
2. `POST /api/v1/auth/refresh` 자동 호출 (쿠키 자동 전송)
3. 새 accessToken을 sessionStorage에 덮어쓰기
4. 원래 요청 재시도
5. 실패 시 → sessionStorage 클리어, `/login`으로 이동

---

## 4. 로그아웃

### `POST /api/v1/auth/logout`

#### Request

- `Authorization: Bearer {accessToken}`
- refreshToken은 쿠키로 자동 전송 (v3 변경: body → 쿠키)

#### Response 200

```json
{
  "message": "로그아웃 성공"
}
```

#### 프론트 처리

1. `POST /api/v1/auth/logout` 호출
2. sessionStorage에서 accessToken 삭제
3. `/login`으로 이동

---

## 5. 프로필 조회

### `GET /api/v1/auth/profile`

#### Request

- `Authorization: Bearer {accessToken}`

#### Response 200

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "목정빈",
  "email": "user@hanyang.ac.kr",
  "studentId": "2025000000",
  "department": "컴퓨터학부",
  "baekjoonId": "baekjoon123",
  "phoneNumber": "010-1234-5678",
  "role": "ROLE_USER",
  "status": "ACTIVE",
  "createdAt": "2025-01-31T10:00:00Z"
}
```

---

## 6. 프로필 수정

### `PATCH /api/v1/auth/profile`

#### Request

- `Authorization: Bearer {accessToken}`
- 변경할 필드만 전송

```json
{
  "phoneNumber": "010-9999-8888",
  "baekjoonId": "newId"
}
```

#### Response 200

```json
{
  "message": "수정 성공"
}
```

---

## 요약

| 항목         | 저장소         | 관리 주체 |
| ------------ | -------------- | --------- |
| accessToken  | sessionStorage | 프론트    |
| refreshToken | httpOnly 쿠키  | 서버      |

- 모든 API 요청에 `withCredentials: true` 필요 (쿠키 자동 전송)
- 회원가입 후 관리자 승인(ACTIVE) 전까지 로그인 불가
