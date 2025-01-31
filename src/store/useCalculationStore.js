import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Changed to named export
export const useCalculationStore = create(
  persist(
    (set) => ({
      recentCalculations: [],
      addCalculation: (calculation) =>
        set((state) => ({
          recentCalculations: [
            calculation,
            ...state.recentCalculations.slice(0, 9), // Keep only last 10 calculations
          ],
        })),
      clearCalculations: () => set({ recentCalculations: [] }),
    }),
    {
      name: 'calculations-storage',
    }
  )
);