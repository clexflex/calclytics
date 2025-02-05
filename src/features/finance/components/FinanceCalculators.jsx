import React from 'react';
import CalculatorCard from '@/components/CalculatorCard';

const calculators = [
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest over time with customizable compounding periods',
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest based on principal, rate, and time',
  },
  {
    id: 'loan-payment',
    name: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments and total interest paid',
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI based on loan amount, interest rate, and tenure',
  },
];

const FinanceCalculators = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <CalculatorCard
            key={calc.id}
            name={calc.name}
            description={calc.description}
            categoryId="finance"
            calculatorId={calc.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FinanceCalculators;
