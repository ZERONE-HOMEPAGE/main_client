import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveStudy } from '@/api/study';

export const useLeaveStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studyId: string) => leaveStudy(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStudies'] });
    },
  });
};
