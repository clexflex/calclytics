import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';
import { useCalculator } from '../hooks/useCalculator';
import { emiSchema } from "./schemas/emiSchema";


const calculateEMI = ({ loanAmount, interestRate, tenure }) => {
  const monthlyRate = interestRate / (12 * 100);
  const tenureMonths = tenure * 12;
  
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return {
    emi,
    totalPayment,
    totalInterest,
  };
};

const EMICalculator = () => {
  const { form, result, onSubmit } = useCalculator({
    schema: emiSchema,
    calculate: calculateEMI,
    calculatorId: 'emi',
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <BaseCalculatorLayout
      title="EMI Calculator"
      description="Calculate monthly EMI based on loan amount, interest rate, and tenure"
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
          <label className="text-sm font-medium">Interest Rate (% per year)</label>
          <Input
            type="number"
            step="0.1"
            placeholder="7.5"
            {...register('interestRate', { valueAsNumber: true })}
          />
          {errors.interestRate && (
            <p className="text-sm text-destructive">{errors.interestRate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tenure (years)</label>
          <Input
            type="number"
            step="1"
            placeholder="10"
            {...register('tenure', { valueAsNumber: true })}
          />
          {errors.tenure && (
            <p className="text-sm text-destructive">{errors.tenure.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Monthly EMI</h4>
                <p className="text-2xl font-bold">${result.emi.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Interest</h4>
                <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Payment</h4>
                <p className="text-2xl font-bold">${result.totalPayment.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </BaseCalculatorLayout>
  );
};

export default EMICalculator;
