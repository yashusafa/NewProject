import { z } from 'zod';
import { categories, styleModes } from '@/lib/types/domain';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const onboardingSchema = z.object({
  displayName: z.string().min(2),
  height: z.string().max(50).optional(),
  bodyBuild: z.string().max(50).optional(),
  skinTone: z.string().max(50).optional(),
  avatarBase: z.string().default('classic')
});

export const budgetSchema = z.object({
  minBudget: z.coerce.number().nonnegative(),
  maxBudget: z.coerce.number().positive(),
  includedCategories: z.array(z.enum(categories)).min(1),
  trendPreference: z.coerce.number().min(0).max(100)
}).refine((v) => v.maxBudget >= v.minBudget, {
  message: 'Max budget must be greater than or equal to min budget',
  path: ['maxBudget']
});

export const styleSchema = z.object({
  styleMode: z.enum(styleModes)
});

export const outfitSaveSchema = z.object({
  title: z.string().min(2).max(80)
});
