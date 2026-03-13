import { client } from '@/api/client';

// ─── 타입 정의 ───────────────────────────────────────────

export interface Mentor {
  userId: string;
  name: string;
  department: string;
  studentId: string;
  email: string | null;
  note: string;
}

export interface OperationTime {
  weekday: string;
  startTime: string;
  endTime: string;
}

export interface StudyClass {
  classId: string;
  mentors: Mentor[];
  operationTimes: OperationTime[];
}

export interface Study {
  studyId: string;
  studyName: string;
  operation: {
    year: number;
    semester: number;
  };
  description: string;
  displayOrder: number;
  joinable: boolean;
  classes: StudyClass[];
}

export interface StudyListResponse {
  items: Study[];
}

export interface StudyListParams {
  year?: number;
  semester?: number;
}

// ─── API 호출 함수 ────────────────────────────────────────

/** 스터디 목록 조회 (기본: 현재 학기 기준) */
export const getStudies = (params?: StudyListParams) =>
  client.get<StudyListResponse>('/studies', { params }).then((res) => res.data);

/** 스터디 상세 조회 */
export const getStudyById = (studyId: string) =>
  client.get<Study>(`/studies/${studyId}`).then((res) => res.data);
