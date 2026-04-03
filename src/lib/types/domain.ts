export const categories = ['tops', 'bottoms', 'shoes', 'outerwear', 'accessories'] as const;
export type Category = (typeof categories)[number];

export const styleModes = [
  'casual',
  'office',
  'date night',
  'travel',
  'wedding guest',
  'streetwear',
  'minimalist',
  'vintage-inspired',
  'trend-forward'
] as const;
export type StyleMode = (typeof styleModes)[number];

export type BudgetState = 'under-budget' | 'in-range' | 'over-budget';

export interface ProductCardModel {
  id: string;
  vendorName: string;
  title: string;
  category: Category;
  price: number;
  styleTags: string[];
  imageUrl: string;
  availability: boolean;
}
