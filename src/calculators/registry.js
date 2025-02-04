export const calculatorRegistry = {
  finance: {
    'simple-interest': {
      name: 'Simple Interest Calculator',
      description: 'Calculate simple interest based on principal, rate, and time',
      component: () => import('./finance/SimpleInterestCalculator'),
      schema: () => import('./finance/schemas/simpleInterestSchema'),
    },
    'compound-interest': {
      name: 'Compound Interest Calculator',
      description: 'Calculate compound interest with customizable compounding periods',
      component: () => import('./finance/CompoundInterestCalculator'),
      schema: () => import('./finance/schemas/compoundInterestSchema'),
    },
    'cagr': {
      name: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate',
      component: () => import('./finance/CAGRCalculator'),
    },
    'loan-payment': {
      name: 'Loan Payment Calculator',
      description: 'Calculate monthly loan payments and total interest paid',
      component: () => import('./finance/LoanPaymentCalculator'),
      schema: () => import('./finance/schemas/loanPaymentSchema'),
    },
  },
};
