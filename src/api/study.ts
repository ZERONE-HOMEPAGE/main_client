import { client } from '@/api/client';

// ─── 타입 정의 ───────────────────────────────────────────

export interface StudyTimeSlot {
  startTime: string;
  endTime: string;
}

export interface Mentor {
  classId: string;
  userId: string;
  name: string;
  department: string;
  studentId: string;
  email: string | null;
  studyTime: Record<string, StudyTimeSlot>;
  maxCapacity: number | null;
  currentEnrollment: number;
  applyButton: boolean;
}

export interface Study {
  studyId: string;
  name: string;
  year: number;
  semester: number;
  target: string;
  description: string;
  mentors: Mentor[];
}

export interface StudyListResponse {
  items: Study[];
}

export interface StudyListParams {
  year?: number;
  semester?: number;
}

// ─── 구 API 포맷 → 신 포맷 변환 ──────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeStudy(raw: any): Study {
  // 신 포맷이면 그대로 반환
  if (Array.isArray(raw.mentors)) return raw as Study;

  // 구 포맷 변환: classes[].mentors + operationTimes → mentors[].studyTime
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
      studyTime: Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cls.operationTimes ?? []).map((t: any) => [
          t.weekday,
          { startTime: t.startTime, endTime: t.endTime },
        ]),
      ),
      maxCapacity: 0,
      currentEnrollment: 0,
      applyButton: raw.joinable ?? false,
    })),
  );

  return {
    studyId: raw.studyId,
    name: raw.studyName ?? raw.name ?? '',
    year: raw.operation?.year ?? raw.year ?? 0,
    semester: raw.operation?.semester ?? raw.semester ?? 0,
    target: raw.target ?? '',
    description: raw.description ?? '',
    mentors,
  };
}

// ─── API 호출 함수 ────────────────────────────────────────

/** 스터디 목록 조회 (기본: 현재 학기 기준) */
export const getStudies = (params?: StudyListParams) =>
  client
    .get<{ items: unknown[] }>('/studies', { params })
    .then((res) => ({ items: res.data.items.map(normalizeStudy) }));

/** 스터디 상세 조회 */
export const getStudyById = (studyId: string) =>
  client.get<unknown>(`/studies/${studyId}`).then((res) => normalizeStudy(res.data));
