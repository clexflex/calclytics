import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { calculatorRegistry } from '@/calculators/registry';

const CalculatorPage = () => {
  const { categoryId, calculatorId } = useParams();
  
  const calculator = calculatorRegistry[categoryId]?.[calculatorId];
  
  if (!calculator) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Calculator not found</h1>
      </div>
    );
  }

  const CalculatorComponent = lazy(calculator.component);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Suspense fallback={<div>Loading calculator...</div>}>
        <CalculatorComponent />
      </Suspense>
    </motion.div>
  );
};

export default CalculatorPage;