import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCalculationStore } from '@/store/useCalculationStore';

export const useRealTimeCalculator = ({ 
  schema, 
  calculate, 
  calculatorId,
  dependencies = [],
  requiredFields = [] 
}) => {
  const [result, setResult] = useState(null);
  const addCalculation = useCalculationStore((state) => state.addCalculation);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const { watch, reset, formState: { errors } } = form;
  const values = watch();

  useEffect(() => {
    // Check if we have all required fields with valid values
    const hasAllRequired = requiredFields.every(field => {
      const value = values[field];
      return value !== undefined && value !== '' && !errors[field];
    });

    if (hasAllRequired) {
      try {
        const calculationResult = calculate(values);
        setResult(calculationResult);
        
        // Store the calculation
        addCalculation({
          type: calculatorId,
          date: new Date().toISOString(),
          input: values,
          result: calculationResult,
        });
      } catch (error) {
        console.error('Calculation error:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [values, ...dependencies]);

  const handleReset = () => {
    reset();
    setResult(null);
  };

  return {
    form,
    result,
    reset: handleReset,
    isValid: !Object.keys(errors).length,
  };
};