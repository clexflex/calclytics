import React from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';
import { useRealTimeCalculator } from '@/hooks/use-real-time-calculator';

const cagrSchema = z.object({
  initialValue: z.number().positive('Initial value must be greater than 0').optional(),
  finalValue: z.number().positive('Final value must be greater than 0').optional(),
  periods: z.number().positive('Number of periods must be greater than 0').optional(),
  cagr: z.number().min(-100).max(1000).optional(),
});

const calculateCAGR = (values) => {
  const { initialValue, finalValue, periods, cagr } = values;
  const filledFields = Object.entries(values).filter(([_, value]) => value !== undefined && value !== '').length;
  
  if (filledFields < 3) return null;

  try {
    if (!cagr && initialValue && finalValue && periods) {
      const calculatedCAGR = (Math.pow(finalValue / initialValue, 1 / periods) - 1) * 100;
      return {
        cagr: calculatedCAGR,
        initialValue,
        finalValue,
        periods,
        absoluteGrowth: finalValue - initialValue,
        growthPercentage: ((finalValue - initialValue) / initialValue) * 100
      };
    }
    
    if (!periods && initialValue && finalValue && cagr) {
      const calculatedPeriods = Math.log(finalValue / initialValue) / Math.log(1 + cagr / 100);
      return {
        cagr,
        initialValue,
        finalValue,
        periods: calculatedPeriods,
        absoluteGrowth: finalValue - initialValue,
        growthPercentage: ((finalValue - initialValue) / initialValue) * 100
      };
    }
    
    if (!initialValue && finalValue && periods && cagr) {
      const calculatedInitial = finalValue / Math.pow(1 + cagr / 100, periods);
      return {
        cagr,
        initialValue: calculatedInitial,
        finalValue,
        periods,
        absoluteGrowth: finalValue - calculatedInitial,
        growthPercentage: ((finalValue - calculatedInitial) / calculatedInitial) * 100
      };
    }
    
    if (!finalValue && initialValue && periods && cagr) {
      const calculatedFinal = initialValue * Math.pow(1 + cagr / 100, periods);
      return {
        cagr,
        initialValue,
        finalValue: calculatedFinal,
        periods,
        absoluteGrowth: calculatedFinal - initialValue,
        growthPercentage: ((calculatedFinal - initialValue) / initialValue) * 100
      };
    }
  } catch (error) {
    console.error('Calculation error:', error);
    return null;
  }
  
  return null;
};

const CAGRCalculator = () => {
  const { form, result, reset } = useRealTimeCalculator({
    schema: cagrSchema,
    calculate: calculateCAGR,
    calculatorId: 'cagr',
    requiredFields: [],
  });

  const { register, formState: { errors } } = form;

  return (
    <BaseCalculatorLayout
      title="CAGR Calculator"
      description="Calculate Compound Annual Growth Rate by entering any three values"
      onReset={reset}
      result={result}
    >
      <div className="space-y-6">
        {[
          { name: 'initialValue', label: 'Initial Value', placeholder: 'Enter initial value' },
          { name: 'finalValue', label: 'Final Value', placeholder: 'Enter final value' },
          { name: 'periods', label: 'Number of Periods (Years)', placeholder: 'Enter number of years' },
          { name: 'cagr', label: 'CAGR (%)', placeholder: 'Enter CAGR percentage' }
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <Input
              type="number"
              placeholder={field.placeholder}
              {...register(field.name, { 
                valueAsNumber: true,
                setValueAs: v => v === '' ? undefined : parseFloat(v)
              })}
              className={errors[field.name] ? 'border-destructive' : ''}
            />
            {errors[field.name] && (
              <p className="text-sm text-destructive">{errors[field.name].message}</p>
            )}
          </div>
        ))}
      </div>
    </BaseCalculatorLayout>
  );
};

export default CAGRCalculator;