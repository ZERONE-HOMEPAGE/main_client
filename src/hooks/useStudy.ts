import { useQuery } from '@tanstack/react-query';
import { getStudies, getStudyById, type StudyListParams } from '@/api/study';

export const studyKeys = {
  all: ['studies'] as const,
  list: (params?: StudyListParams) => [...studyKeys.all, 'list', params] as const,
  detail: (studyId: string) => [...studyKeys.all, 'detail', studyId] as const,
};

/** 스터디 목록 (현재 학기 기준) */
export const useStudies = (params?: StudyListParams) =>
  useQuery({
    queryKey: studyKeys.list(params),
    queryFn: () => getStudies(params),
    select: (data) => data.items,
  });

/** 스터디 상세 */
export const useStudy = (studyId: string) =>
  useQuery({
    queryKey: studyKeys.detail(studyId),
    queryFn: () => getStudyById(studyId),
    enabled: !!studyId,
  });
