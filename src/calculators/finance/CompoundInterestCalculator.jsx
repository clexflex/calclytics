import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';
import { useCalculator } from '../hooks/useCalculator';
import { compoundInterestSchema } from './schemas/compoundInterestSchema';

const calculate = ({ principal, rate, time, frequency = 12 }) => {
  const r = rate / 100;
  const n = frequency;
  const t = time;
  const amount = principal * Math.pow(1 + r/n, n * t);
  return {
    finalAmount: amount,
    interest: amount - principal,
  };
};

const CompoundInterestCalculator = () => {
  const { form, result, onSubmit } = useCalculator({
    schema: compoundInterestSchema,
    calculate,
    calculatorId: 'compound-interest',
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <BaseCalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest with customizable compounding periods"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Principal Amount</label>
          <Input
            type="number"
            step="0.01"
            {...register('principal', { valueAsNumber: true })}
          />
          {errors.principal && (
            <p className="text-sm text-destructive">
              {errors.principal.message}
            </p>
          )}
        </div>

        {/* Add other form fields */}
        
        <Button type="submit" className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="font-medium mb-2">Results:</h3>
            <p>Final Amount: ${result.finalAmount.toFixed(2)}</p>
            <p>Total Interest: ${result.interest.toFixed(2)}</p>
          </div>
        )}
      </form>
    </BaseCalculatorLayout>
  );
};

export default CompoundInterestCalculator;