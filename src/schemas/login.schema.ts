import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password required minimun 6 character'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
