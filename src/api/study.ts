import { client } from '@/api/client';
import { JoinStudyResponse, MyStudiesResponse } from '@/types/study';

export const getMyStudies = (): Promise<MyStudiesResponse> =>
  client.get<MyStudiesResponse>('api/v1/studies/my').then((res) => res.data);

export const joinStudy = (studyId: string): Promise<JoinStudyResponse> =>
  client.post<JoinStudyResponse>(`api/v1/studies/${studyId}/join`).then((res) => res.data);

export const leaveStudy = (studyId: string): Promise<void> =>
  client.post(`api/v1/studies/${studyId}/leave`).then((res) => res.data);
