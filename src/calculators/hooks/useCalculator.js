import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCalculationStore } from '@/store/useCalculationStore'; // Now this will work

export const useCalculator = ({ schema, calculate, calculatorId }) => {
  const [result, setResult] = useState(null);
  const addCalculation = useCalculationStore((state) => state.addCalculation);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const calculationResult = calculate(data);
    setResult(calculationResult);
    
    addCalculation({
      type: calculatorId,
      date: new Date().toISOString(),
      input: data,
      result: calculationResult,
    });
  };

  return { form, result, onSubmit };
};