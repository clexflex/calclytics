import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';
import { useCalculator } from '../hooks/useCalculator';
import { simpleInterestSchema } from './schemas/simpleInterestSchema';


const calculateSimpleInterest = ({ principal, rate, time }) => {
  const interest = (principal * rate * time) / 100;
  const totalAmount = principal + interest;
  const yearlyInterest = interest / time;
  const monthlyPayment = totalAmount / (time * 12);

  return {
    interest,
    totalAmount,
    yearlyInterest,
    monthlyPayment,
  };
};

const SimpleInterestCalculator = () => {
  const { form, result, onSubmit } = useCalculator({
    schema: simpleInterestSchema,
    calculate: calculateSimpleInterest,
    calculatorId: 'simple-interest',
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <BaseCalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest based on principal amount, interest rate, and time period"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Principal Amount ($)</label>
          <Input
            type="number"
            step="0.01"
            placeholder="10000"
            {...register('principal', { valueAsNumber: true })}
          />
          {errors.principal && (
            <p className="text-sm text-destructive">{errors.principal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Interest Rate (% per year)</label>
          <Input
            type="number"
            step="0.1"
            placeholder="5"
            {...register('rate', { valueAsNumber: true })}
          />
          {errors.rate && (
            <p className="text-sm text-destructive">{errors.rate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time Period (years)</label>
          <Input
            type="number"
            step="0.5"
            placeholder="3"
            {...register('time', { valueAsNumber: true })}
          />
          {errors.time && (
            <p className="text-sm text-destructive">{errors.time.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Interest</h4>
                <p className="text-2xl font-bold">${result.interest.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Amount</h4>
                <p className="text-2xl font-bold">${result.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Yearly Interest</h4>
                <p className="text-2xl font-bold">${result.yearlyInterest.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Monthly Payment</h4>
                <p className="text-2xl font-bold">${result.monthlyPayment.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </BaseCalculatorLayout>
  );
};

export default SimpleInterestCalculator;