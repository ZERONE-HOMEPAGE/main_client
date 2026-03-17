import { client } from '@/api/client';
import type { JoinStudyResponse, MyStudiesResponse } from '@/types/study';

// ─── 타입 정의 ───────────────────────────────────────────

export interface StudyTimeSlot {
  startTime: string;
  endTime: string;
  maxCapacity: number | null;
}

export interface Mentor {
  classId: string;
  userId: string;
  name: string;
  department: string;
  studentId: string;
  email: string | null;
  note: string;
  studyTime: Record<string, StudyTimeSlot>;
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
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Study {
  studyId: string;
  name: string;
  year: number;
  semester: number;
  target: string;
  description: string;
  displayOrder: number;
  joinable: boolean;
  mentors: Mentor[];
  weeks: Week[];
}

export interface StudyListParams {
  year?: number;
  semester?: number;
}

// ─── API 응답 → Study 변환 ────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toStudy(raw: any): Study {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mentors: Mentor[] = (raw.classes ?? []).flatMap((cls: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cls.mentors ?? []).map((m: any) => ({
      classId: cls.classId ?? '',
      userId: m.userId,
      name: m.name,
      department: m.department,
      studentId: m.studentId,
      email: m.email ?? null,
      note: m.note ?? '',
      studyTime: Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cls.operationTimes ?? []).map((t: any) => [
          t.weekday,
          { startTime: t.startTime, endTime: t.endTime, maxCapacity: t.maxMembers ?? null },
        ]),
      ),
    })),
  );

  return {
    studyId: raw.studyId,
    name: raw.studyName,
    year: raw.operation.year,
    semester: raw.operation.semester,
    target: raw.target ?? '',
    description: raw.description ?? '',
    displayOrder: raw.displayOrder,
    joinable: raw.joinable,
    mentors,
    weeks: raw.weeks ?? [],
  };
}

// ─── API 호출 함수 ────────────────────────────────────────

/** 스터디 목록 조회 (기본: 현재 학기 기준) */
export const getStudies = (params?: StudyListParams) =>
  client
    .get<{ items: unknown[] }>('/studies', { params })
    .then((res) => res.data.items.map(toStudy));

/** 스터디 상세 조회 */
export const getStudyById = (studyId: string) =>
  client.get<unknown>(`/studies/${studyId}`).then((res) => toStudy(res.data));

/** 내 스터디 목록 조회 */
export const getMyStudies = (): Promise<MyStudiesResponse> =>
  client.get<MyStudiesResponse>('/studies/my').then((res) => res.data);

/** 스터디 가입 */
export const joinStudy = (studyId: string): Promise<JoinStudyResponse> =>
  client.post<JoinStudyResponse>(`/studies/${studyId}/join`).then((res) => res.data);

/** 스터디 탈퇴 */
export const leaveStudy = (studyId: string): Promise<void> =>
  client.post(`/studies/${studyId}/leave`).then((res) => res.data);
