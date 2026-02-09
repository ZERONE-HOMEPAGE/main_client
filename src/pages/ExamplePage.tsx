import { useUsers } from '@/hooks/useExample';

export default function ExamplePage() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-bold">유저 목록</h1>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li key={user.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="mt-1 text-sm text-gray-600">이메일: {user.email}</p>
            <p className="text-sm text-gray-600">전화번호: {user.phone}</p>
            <p className="text-sm text-gray-600">회사: {user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
