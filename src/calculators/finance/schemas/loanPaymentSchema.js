import { z } from 'zod';

export const loanPaymentSchema = z.object({
  loanAmount: z
    .number()
    .positive('Loan amount must be greater than 0')
    .max(1000000000, 'Loan amount must be less than 1 billion'),

  interestRate: z
    .number()
    .min(0, 'Interest rate cannot be negative')
    .max(100, 'Interest rate must be less than 100%'),

  loanTerm: z
    .number()
    .positive('Loan term must be greater than 0')
    .max(50, 'Loan term must be less than 50 years'),
});
