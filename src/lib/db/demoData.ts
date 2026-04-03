import type { ProductCardModel } from '@/lib/types/domain';

export const demoProducts: ProductCardModel[] = [
  { id: 'atlas-top-1', vendorName: 'Atlas Apparel', title: 'Relaxed Linen Shirt', category: 'tops', price: 48, styleTags: ['casual', 'travel'], imageUrl: '/placeholder-top.jpg', availability: true },
  { id: 'atlas-bottom-1', vendorName: 'Atlas Apparel', title: 'Tailored Chino', category: 'bottoms', price: 62, styleTags: ['office', 'minimalist'], imageUrl: '/placeholder-bottom.jpg', availability: true },
  { id: 'north-outer-1', vendorName: 'Northlane Studio', title: 'Utility Overshirt', category: 'outerwear', price: 85, styleTags: ['streetwear', 'travel'], imageUrl: '/placeholder-outer.jpg', availability: true },
  { id: 'north-acc-1', vendorName: 'Northlane Studio', title: 'Minimal Watch', category: 'accessories', price: 55, styleTags: ['office', 'date night'], imageUrl: '/placeholder-accessory.jpg', availability: true },
  { id: 'cinder-shoes-1', vendorName: 'Cinder Collective', title: 'Block Heel Sandal', category: 'shoes', price: 68, styleTags: ['wedding guest', 'date night'], imageUrl: '/placeholder-shoes.jpg', availability: true }
];
