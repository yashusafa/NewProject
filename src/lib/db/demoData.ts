import type { ProductCardModel } from '@/lib/types/domain';

export const demoProducts: ProductCardModel[] = [
  {
    id: 'atlas-top-1',
    vendorName: 'Atlas Apparel',
    vendorSlug: 'atlas-apparel',
    title: 'Relaxed Linen Shirt',
    category: 'tops',
    price: 48,
    styleTags: ['casual', 'travel', 'minimalist'],
    trendScore: 0.42,
    imageUrl: '/placeholder-top.jpg',
    availability: true,
    sourceUrl: 'https://example.com/atlas-top-1',
    color: 'sand'
  },
  {
    id: 'atlas-bottom-1',
    vendorName: 'Atlas Apparel',
    vendorSlug: 'atlas-apparel',
    title: 'Tailored Chino',
    category: 'bottoms',
    price: 62,
    styleTags: ['office', 'minimalist'],
    trendScore: 0.35,
    imageUrl: '/placeholder-bottom.jpg',
    availability: true,
    sourceUrl: 'https://example.com/atlas-bottom-1',
    color: 'navy'
  },
  {
    id: 'north-outer-1',
    vendorName: 'Northlane Studio',
    vendorSlug: 'northlane-studio',
    title: 'Utility Overshirt',
    category: 'outerwear',
    price: 85,
    styleTags: ['streetwear', 'travel'],
    trendScore: 0.66,
    imageUrl: '/placeholder-outer.jpg',
    availability: true,
    sourceUrl: 'https://example.com/north-outer-1',
    color: 'olive'
  },
  {
    id: 'north-acc-1',
    vendorName: 'Northlane Studio',
    vendorSlug: 'northlane-studio',
    title: 'Minimal Watch',
    category: 'accessories',
    price: 55,
    styleTags: ['office', 'date night'],
    trendScore: 0.51,
    imageUrl: '/placeholder-accessory.jpg',
    availability: true,
    sourceUrl: 'https://example.com/north-acc-1',
    color: 'silver'
  },
  {
    id: 'cinder-shoes-1',
    vendorName: 'Cinder Collective',
    vendorSlug: 'cinder-collective',
    title: 'Block Heel Sandal',
    category: 'shoes',
    price: 68,
    styleTags: ['wedding guest', 'date night'],
    trendScore: 0.59,
    imageUrl: '/placeholder-shoes.jpg',
    availability: true,
    sourceUrl: 'https://example.com/cinder-shoes-1',
    color: 'cream'
  },
  {
    id: 'cinder-top-2',
    vendorName: 'Cinder Collective',
    vendorSlug: 'cinder-collective',
    title: 'Satin Drape Blouse',
    category: 'tops',
    price: 72,
    styleTags: ['date night', 'trend-forward'],
    trendScore: 0.83,
    imageUrl: '/placeholder-top.jpg',
    availability: true,
    sourceUrl: 'https://example.com/cinder-top-2',
    color: 'black'
  }
];
