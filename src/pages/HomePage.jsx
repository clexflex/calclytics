import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/CategoryCard';

const categories = [
  { name: 'Finance', count: 581, slug: 'finance' },
  { name: 'Math', count: 668, slug: 'math' },
  { name: 'Physics', count: 524, slug: 'physics' },
  // Add other categories
];

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Calculator Hub</h1>
        <p className="text-xl text-muted-foreground">
          Find the perfect calculator for your needs
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            count={category.count}
            slug={category.slug}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HomePage;