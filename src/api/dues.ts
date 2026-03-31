import { client } from '@/api/client';
import { DuesInfoResponse } from '@/types/Dues';

export const duesinfo = (): Promise<DuesInfoResponse> =>
  client.get('/api/v1/dues/info').then((res) => res.data);
