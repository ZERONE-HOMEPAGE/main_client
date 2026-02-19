//안쓰는 파일(참고용입니다)
//apis에 api호출함수 작성 -> hook에서 reactQuery사용하여 api에 작성된 api호출 ->

import { client } from '@/api/client';
import type { User } from '@/types/example';

export const getUsers = () =>
  client.get<User[]>('/users').then((res) => res.data);

export const getUserById = (id: number) =>
  client.get<User>(`/users/${id}`).then((res) => res.data);
