import * as z from 'zod';

export const compoundInterestSchema = z.object({
  principal: z
    .number()
    .min(1, { message: 'Principal amount must be greater than zero.' })
    .max(1000000000, { message: 'Principal amount is too high.' }),
  
  rate: z
    .number()
    .min(0, { message: 'Rate of interest must be a positive value.' })
    .max(100, { message: 'Rate of interest should not exceed 100%' }),
  
  time: z
    .number()
    .min(1, { message: 'Time must be at least 1 year.' })
    .max(100, { message: 'Time must not exceed 100 years.' }),

  frequency: z
    .number()
    .min(1, { message: 'Frequency must be at least once per year.' })
    .max(365, { message: 'Frequency cannot exceed daily compounding (365 times a year).' })
    .default(12), // default to monthly compounding
});

