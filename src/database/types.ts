import { z } from 'zod/v4';

export const Person = z.object({
  name: z.string().trim().min(1),
  age: z.number().positive().max(150),
});

export const Event = z.object({
  name: z.string().trim().min(1),
  date: z.iso.date(),
  person_id: z.number().positive().nonoptional(),
});

export type Event = z.infer<typeof Event>;
export type Person = z.infer<typeof Person>;
