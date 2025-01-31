import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryComponents = {
  finance: React.lazy(() => import('@/features/finance/components/FinanceCalculators')),
  // Add other category components as needed
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const CategoryComponent = categoryComponents[categoryId];

  if (!CategoryComponent) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center capitalize">
            {categoryId} Calculators
          </h1>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8 text-center">
            Loading calculators...
          </div>
        }
      >
        <CategoryComponent />
      </Suspense>
    </motion.div>
  );
};


export default CategoryPage;
