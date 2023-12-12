import { z } from 'zod';

export const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_NAME: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof EnvSchema>;
