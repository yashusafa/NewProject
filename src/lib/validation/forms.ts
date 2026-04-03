import { z } from 'zod';
import { categories, styleModes } from '@/lib/types/domain';

export const onboardingSchema = z.object({
  displayName: z.string().min(2),
  height: z.string().optional(),
  bodyBuild: z.string().optional(),
  skinTone: z.string().optional(),
  avatarBase: z.string().default('default')
});

export const budgetSchema = z.object({
  minBudget: z.coerce.number().nonnegative(),
  maxBudget: z.coerce.number().positive(),
  includedCategories: z.array(z.enum(categories)).min(1),
  trendPreference: z.coerce.number().min(0).max(100)
}).refine((v) => v.maxBudget >= v.minBudget, 'Max budget must be >= min budget');

export const styleSchema = z.object({
  styleMode: z.enum(styleModes)
});
