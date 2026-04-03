import type { Category, StyleMode } from '@/lib/types/domain';

export interface SourceProduct {
  id: string;
  title: string;
  category: Category;
  price: number;
  imageUrl: string;
  styleTags: StyleMode[];
  availability: boolean;
}

export interface NormalizedProduct extends SourceProduct {
  vendorName: string;
  sourceUrl: string;
}

export interface VendorAdapter {
  vendorName: string;
  slug: string;
  listProducts(): Promise<SourceProduct[]>;
}
