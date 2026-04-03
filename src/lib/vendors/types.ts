import type { Category, StyleMode } from '@/lib/types/domain';

export type VendorSourceType = 'json' | 'csv' | 'xml' | 'api' | 'affiliate';

export interface VendorFeedConfig {
  sourceType: VendorSourceType;
  location: string;
  authRequired?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SourceProduct {
  externalId: string;
  title: string;
  category: Category;
  price: number;
  currency: string;
  imageUrl: string;
  sourceUrl: string;
  color?: string;
  sizeAvailability?: string[];
  tags: string[];
  styleTags: StyleMode[];
  trendScore: number;
  availability: boolean;
  raw: Record<string, unknown>;
}

export interface NormalizedProduct {
  id: string;
  vendorName: string;
  vendorSlug: string;
  title: string;
  category: Category;
  price: number;
  currency: string;
  imageUrl: string;
  sourceUrl: string;
  color?: string;
  tags: string[];
  styleTags: StyleMode[];
  trendScore: number;
  availability: boolean;
  normalizedMetadata: Record<string, unknown>;
}

export interface VendorAdapter {
  vendorName: string;
  slug: string;
  feed: VendorFeedConfig;
  fetchProducts(): Promise<SourceProduct[]>;
}
