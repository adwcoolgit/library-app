import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterService } from '../register.service';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RegisterService,
    onSuccess: (result) => {
      if (!result) {
        console.warn('There something went wrong');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
  });
}
