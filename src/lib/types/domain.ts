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
  vendorSlug: string;
  title: string;
  category: Category;
  price: number;
  styleTags: string[];
  trendScore: number;
  imageUrl: string;
  availability: boolean;
  sourceUrl: string;
  color?: string;
}

export interface AvatarProfileInput {
  displayName: string;
  height?: string;
  bodyBuild?: string;
  skinTone?: string;
  avatarBase?: string;
}

export interface BudgetProfileInput {
  minBudget: number;
  maxBudget: number;
  includedCategories: Category[];
  trendPreference: number;
}
