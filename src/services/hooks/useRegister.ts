import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRegisterService } from '../register.service';

export function useRegister() {
  return useRegisterService();
}
