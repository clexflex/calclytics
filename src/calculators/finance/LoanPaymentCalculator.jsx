import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';
import { useCalculator } from '../hooks/useCalculator';
import { loanPaymentSchema } from './schemas/loanPaymentSchema';

const calculateLoanPayment = ({ loanAmount, interestRate, loanTerm }) => {
  const principal = loanAmount;
  const annualRate = interestRate / 100;
  const monthlyRate = annualRate / 12;
  const totalPayments = loanTerm * 12;

  let monthlyPayment = 0;
  let totalInterest = 0;

  if (monthlyRate > 0) {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyPayment = principal / totalPayments;
  }

  totalInterest = monthlyPayment * totalPayments - principal;

  return {
    monthlyPayment,
    totalInterest,
  };
};

const LoanPaymentCalculator = () => {
  const { form, result, onSubmit } = useCalculator({
    schema: loanPaymentSchema,
    calculate: calculateLoanPayment,
    calculatorId: 'loan-payment',
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <BaseCalculatorLayout
      title="Loan Payment Calculator"
      description="Calculate your monthly loan payments and total interest paid"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Loan Amount ($)</label>
          <Input
            type="number"
            step="0.01"
            placeholder="50000"
            {...register('loanAmount', { valueAsNumber: true })}
          />
          {errors.loanAmount && (
            <p className="text-sm text-destructive">{errors.loanAmount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Annual Interest Rate (%)</label>
          <Input
            type="number"
            step="0.1"
            placeholder="5.5"
            {...register('interestRate', { valueAsNumber: true })}
          />
          {errors.interestRate && (
            <p className="text-sm text-destructive">{errors.interestRate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Loan Term (Years)</label>
          <Input
            type="number"
            step="1"
            placeholder="10"
            {...register('loanTerm', { valueAsNumber: true })}
          />
          {errors.loanTerm && (
            <p className="text-sm text-destructive">{errors.loanTerm.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Monthly Payment</h4>
                <p className="text-2xl font-bold">${result.monthlyPayment.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Interest Paid</h4>
                <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </BaseCalculatorLayout>
  );
};

export default LoanPaymentCalculator;
