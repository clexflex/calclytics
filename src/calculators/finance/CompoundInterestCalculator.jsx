import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BaseCalculatorLayout from '../base/BaseCalculatorLayout';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(5);
  const [frequency, setFrequency] = useState(12); // Default to monthly compounding
  const [result, setResult] = useState({ finalAmount: 0, interest: 0 });

  // Function to calculate compound interest
  const calculateCompoundInterest = () => {
    const r = rate / 100;
    const n = frequency;
    const t = time;
    const amount = principal * Math.pow(1 + r / n, n * t);
    const interest = amount - principal;

    setResult({
      finalAmount: amount,
      interest: interest,
    });
  };

  return (
    <BaseCalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest with customizable compounding periods"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Principal Amount</label>
          <Input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rate of Interest (%)</label>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Time (years)</label>
          <Input
            type="number"
            value={time}
            onChange={(e) => setTime(parseFloat(e.target.value))}
            step="1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Compounding Frequency (per year)</label>
          <Input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            min="1"
            max="365"
          />
        </div>

        <Button onClick={calculateCompoundInterest} className="w-full">
          Calculate
        </Button>

        {result.finalAmount > 0 && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="font-medium mb-2">Results:</h3>
            <p>Final Amount: ${result.finalAmount.toFixed(2)}</p>
            <p>Total Interest: ${result.interest.toFixed(2)}</p>
          </div>
        )}
      </div>
    </BaseCalculatorLayout>
  );
};

export default CompoundInterestCalculator;
