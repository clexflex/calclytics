import { z } from 'zod';

export const simpleInterestSchema = z.object({
  principal: z
    .number()
    .positive('Principal amount must be greater than 0')
    .max(1000000000, 'Principal amount must be less than 1 billion'),
  rate: z
    .number()
    .min(0, 'Interest rate cannot be negative')
    .max(100, 'Interest rate must be less than 100%'),
  time: z
    .number()
    .positive('Time period must be greater than 0')
    .max(50, 'Time period must be less than 50 years'),
});