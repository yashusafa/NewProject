import { describe, expect, it } from 'vitest';
import { calculateBudget } from '@/lib/budget/engine';

describe('calculateBudget', () => {
  it('computes total and counted subtotal independently', () => {
    const result = calculateBudget({
      minBudget: 100,
      maxBudget: 220,
      includedCategories: ['tops', 'bottoms', 'shoes'],
      items: [
        { category: 'tops', price: 50 },
        { category: 'bottoms', price: 65 },
        { category: 'shoes', price: 70 },
        { category: 'accessories', price: 30 }
      ]
    });

    expect(result.totalPrice).toBe(215);
    expect(result.countedSubtotal).toBe(185);
    expect(result.remainingBudget).toBe(35);
    expect(result.state).toBe('in-range');
  });

  it('is under-budget when subtotal is below minimum', () => {
    const result = calculateBudget({
      minBudget: 150,
      maxBudget: 250,
      includedCategories: ['tops', 'bottoms'],
      items: [{ category: 'tops', price: 60 }, { category: 'bottoms', price: 70 }]
    });

    expect(result.countedSubtotal).toBe(130);
    expect(result.state).toBe('under-budget');
  });

  it('is over-budget when subtotal exceeds max', () => {
    const result = calculateBudget({
      minBudget: 100,
      maxBudget: 160,
      includedCategories: ['tops', 'shoes'],
      items: [{ category: 'tops', price: 90 }, { category: 'shoes', price: 80 }]
    });

    expect(result.countedSubtotal).toBe(170);
    expect(result.remainingBudget).toBe(-10);
    expect(result.state).toBe('over-budget');
  });

  it('does not count excluded categories in budget subtotal', () => {
    const result = calculateBudget({
      minBudget: 40,
      maxBudget: 80,
      includedCategories: ['accessories'],
      items: [{ category: 'tops', price: 200 }, { category: 'accessories', price: 50 }]
    });

    expect(result.totalPrice).toBe(250);
    expect(result.countedSubtotal).toBe(50);
    expect(result.remainingBudget).toBe(30);
    expect(result.state).toBe('in-range');
  });

  it('handles empty outfit gracefully', () => {
    const result = calculateBudget({
      minBudget: 60,
      maxBudget: 120,
      includedCategories: ['tops'],
      items: []
    });

    expect(result.totalPrice).toBe(0);
    expect(result.countedSubtotal).toBe(0);
    expect(result.state).toBe('under-budget');
  });

  it('rounds to two decimals', () => {
    const result = calculateBudget({
      minBudget: 10,
      maxBudget: 20,
      includedCategories: ['tops'],
      items: [{ category: 'tops', price: 10.129 }]
    });

    expect(result.totalPrice).toBe(10.13);
    expect(result.countedSubtotal).toBe(10.13);
    expect(result.remainingBudget).toBe(9.87);
  });
});
