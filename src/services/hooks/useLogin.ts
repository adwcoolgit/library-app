'use client';

import { useLoginService } from '../login.service';

export function useLogin() {
  return useLoginService();
}
