import { getUserById, getUsers } from '@/api/example';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

export const useUser = (id: number) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
  });
