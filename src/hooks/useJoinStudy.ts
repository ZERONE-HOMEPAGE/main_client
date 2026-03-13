import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinStudy } from '@/api/study';

export const useJoinStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studyId: string) => joinStudy(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStudies'] });
    },
  });
};
