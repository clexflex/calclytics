export const calculatorRegistry = {
    finance: {
        'simple-interest': {
        name: 'Simple Interest Calculator',
        description: 'Calculate simple interest based on principal, rate, and time',
        component: () => import('./finance/SimpleInterestCalculator'),
        schema: () => import('./finance/schemas/simpleInterestSchema'),
        },
        'cagr': {
      name: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate',
      component: () => import('./finance/CAGRCalculator'),
    },
    },
    // Add other categories similarly
  };
  