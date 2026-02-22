import { client } from '@/api/client';

// ─── 타입 정의 ───────────────────────────────────────────

export interface Mentor {
  userId: string;
  name: string;
  department: string;
  studentId: string;
  email: string | null; // null 가능 (실제 응답 확인됨)
  note: string; // 멘토 한마디
}

export interface Week {
  weekId: number;
  studyId: string;
  weekNo: number;
  startDate: string;
  endDate: string;
  allowedWeekdays: string;
  studyDate: string[];
  requiredCount: number;
  description: string; // 주차별 내용 (예: "입출력", "조건문")
  createdAt: string;
  updatedAt: string;
}

export interface Study {
  studyId: string;
  name: string;
  year: number;
  semester: number;
  status: 'OPEN' | 'CLOSED' | 'ARCHIVED';
  target: string;
  description: string; // \n 구분으로 여러 줄 intro
  displayOrder: number;
  memberCount: number;
  mentorCount: number;
  mentors: Mentor[];
  weeks: Week[]; // 주차별 내용 배열
  createdAt: string;
  updatedAt: string;
}

export interface StudyListResponse {
  items: Study[];
}

export interface StudyListParams {
  year?: number;
  semester?: number;
  includeMentors?: boolean;
}

// ─── API 호출 함수 ────────────────────────────────────────

/** 스터디 목록 조회 (기본: 현재 학기 기준) */
export const getStudies = (params?: StudyListParams) =>
  client.get<StudyListResponse>('/studies', { params }).then((res) => res.data);

/** 스터디 상세 조회 */
export const getStudyById = (studyId: string) =>
  client.get<Study>(`/studies/${studyId}`).then((res) => res.data);
