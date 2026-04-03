import type { BudgetState, Category } from '@/lib/types/domain';

export interface BudgetLineItem {
  category: Category;
  price: number;
}

export interface BudgetInput {
  minBudget: number;
  maxBudget: number;
  includedCategories: Category[];
  items: BudgetLineItem[];
}

export interface BudgetOutput {
  totalPrice: number;
  countedSubtotal: number;
  remainingBudget: number;
  state: BudgetState;
}

export function calculateBudget(input: BudgetInput): BudgetOutput {
  const totalPrice = round2(input.items.reduce((acc, item) => acc + item.price, 0));
  const included = new Set(input.includedCategories);
  const countedSubtotal = round2(input.items.filter((item) => included.has(item.category)).reduce((acc, item) => acc + item.price, 0));
  const remainingBudget = round2(input.maxBudget - countedSubtotal);

  let state: BudgetState = 'in-range';
  if (countedSubtotal < input.minBudget) state = 'under-budget';
  if (countedSubtotal > input.maxBudget) state = 'over-budget';

  return { totalPrice, countedSubtotal, remainingBudget, state };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
