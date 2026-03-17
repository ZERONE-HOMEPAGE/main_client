import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinStudy } from '@/api/study';

export const useJoinStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studyId, selectedWeekdays }: { studyId: string; selectedWeekdays: string[] }) =>
      joinStudy(studyId, selectedWeekdays),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStudies'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
