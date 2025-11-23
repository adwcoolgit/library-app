import z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(6, 'Name must be at least 6 characters long')
      .max(50, 'Name cannot exceed 50 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    avatar: z.string().optional().default(''),
    avatarUrl: z.string().optional().default(''),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type RegisterPayload = z.infer<typeof registerSchema>;
