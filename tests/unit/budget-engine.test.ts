import { describe, expect, it } from 'vitest';
import { calculateBudget } from '@/lib/budget/engine';

describe('calculateBudget', () => {
  it('computes totals and in-range state', () => {
    const result = calculateBudget({
      minBudget: 100,
      maxBudget: 200,
      includedCategories: ['tops', 'bottoms', 'shoes'],
      items: [
        { category: 'tops', price: 40 },
        { category: 'bottoms', price: 50 },
        { category: 'shoes', price: 55 },
        { category: 'accessories', price: 20 }
      ]
    });

    expect(result.totalPrice).toBe(165);
    expect(result.countedSubtotal).toBe(145);
    expect(result.remainingBudget).toBe(55);
    expect(result.state).toBe('in-range');
  });

  it('returns under-budget when counted subtotal below min', () => {
    const result = calculateBudget({ minBudget: 120, maxBudget: 200, includedCategories: ['tops'], items: [{ category: 'tops', price: 90 }] });
    expect(result.state).toBe('under-budget');
  });

  it('returns over-budget when counted subtotal above max', () => {
    const result = calculateBudget({ minBudget: 120, maxBudget: 150, includedCategories: ['tops', 'shoes'], items: [{ category: 'tops', price: 90 }, { category: 'shoes', price: 90 }] });
    expect(result.state).toBe('over-budget');
    expect(result.remainingBudget).toBe(-30);
  });

  it('ignores categories not included in budget subtotal', () => {
    const result = calculateBudget({
      minBudget: 50,
      maxBudget: 70,
      includedCategories: ['accessories'],
      items: [
        { category: 'tops', price: 300 },
        { category: 'accessories', price: 60 }
      ]
    });
    expect(result.countedSubtotal).toBe(60);
    expect(result.totalPrice).toBe(360);
    expect(result.state).toBe('in-range');
  });
});
