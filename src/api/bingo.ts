import { client } from '@/api/client';
import { BingoListResponse, BingoProblemResponse, BingoRankingResponse } from '@/types/Bingo';

export const getBingoList = (): Promise<BingoListResponse> =>
  client.get<BingoListResponse>('/api/v1/bingo/events').then((res) => res.data);

export const getBingoProblem = (event_id: string): Promise<BingoProblemResponse> =>
  client.get<BingoProblemResponse>(`/api/v1/bingo/events/${event_id}`).then((res) => res.data);

export const getBingoRanking = (event_id: string): Promise<BingoRankingResponse> =>
  client
    .get<BingoRankingResponse>(`/api/v1/bingo/events/${event_id}/rankings`)
    .then((res) => res.data);
