import type { SourceProduct, VendorAdapter } from '@/lib/vendors/types';

const atlasProducts: SourceProduct[] = [
  { id: 'atlas-top-1', title: 'Relaxed Linen Shirt', category: 'tops', price: 48, imageUrl: '/placeholder-top.jpg', styleTags: ['casual', 'travel', 'minimalist'], availability: true },
  { id: 'atlas-bottom-1', title: 'Tailored Chino', category: 'bottoms', price: 62, imageUrl: '/placeholder-bottom.jpg', styleTags: ['office', 'minimalist'], availability: true },
  { id: 'atlas-shoes-1', title: 'White Court Sneaker', category: 'shoes', price: 75, imageUrl: '/placeholder-shoes.jpg', styleTags: ['casual', 'streetwear'], availability: true }
];

const northlaneProducts: SourceProduct[] = [
  { id: 'north-outer-1', title: 'Utility Overshirt', category: 'outerwear', price: 85, imageUrl: '/placeholder-outer.jpg', styleTags: ['streetwear', 'travel'], availability: true },
  { id: 'north-acc-1', title: 'Minimal Watch', category: 'accessories', price: 55, imageUrl: '/placeholder-accessory.jpg', styleTags: ['office', 'date night'], availability: true },
  { id: 'north-top-1', title: 'Ribbed Knit Top', category: 'tops', price: 42, imageUrl: '/placeholder-top.jpg', styleTags: ['date night', 'trend-forward'], availability: true }
];

const cinderProducts: SourceProduct[] = [
  { id: 'cinder-bottom-1', title: 'Pleated Midi Skirt', category: 'bottoms', price: 70, imageUrl: '/placeholder-bottom.jpg', styleTags: ['wedding guest', 'vintage-inspired'], availability: true },
  { id: 'cinder-shoes-1', title: 'Block Heel Sandal', category: 'shoes', price: 68, imageUrl: '/placeholder-shoes.jpg', styleTags: ['wedding guest', 'date night'], availability: true },
  { id: 'cinder-acc-1', title: 'Sculptural Earrings', category: 'accessories', price: 32, imageUrl: '/placeholder-accessory.jpg', styleTags: ['date night', 'trend-forward'], availability: true }
];

function adapter(name: string, slug: string, products: SourceProduct[]): VendorAdapter {
  return {
    vendorName: name,
    slug,
    async listProducts() {
      return products;
    }
  };
}

export const mockVendorAdapters: VendorAdapter[] = [
  adapter('Atlas Apparel', 'atlas-apparel', atlasProducts),
  adapter('Northlane Studio', 'northlane-studio', northlaneProducts),
  adapter('Cinder Collective', 'cinder-collective', cinderProducts)
];
