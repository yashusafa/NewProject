import type { SourceProduct, VendorAdapter, VendorFeedConfig } from '@/lib/vendors/types';

function createAdapter(vendorName: string, slug: string, feed: VendorFeedConfig, products: SourceProduct[]): VendorAdapter {
  return {
    vendorName,
    slug,
    feed,
    async fetchProducts() {
      return products;
    }
  };
}

export const mockVendorAdapters: VendorAdapter[] = [
  createAdapter(
    'Atlas Apparel',
    'atlas-apparel',
    { sourceType: 'json', location: 'seed://atlas.json' },
    [
      {
        externalId: 'atlas-top-1',
        title: 'Relaxed Linen Shirt',
        category: 'tops',
        price: 48,
        currency: 'USD',
        imageUrl: '/placeholder-top.jpg',
        sourceUrl: 'https://example.com/atlas/linen-shirt',
        color: 'sand',
        sizeAvailability: ['S', 'M', 'L'],
        tags: ['linen', 'breathable'],
        styleTags: ['casual', 'travel', 'minimalist'],
        trendScore: 0.42,
        availability: true,
        raw: { source: 'atlas-seed' }
      }
    ]
  ),
  createAdapter(
    'Northlane Studio',
    'northlane-studio',
    { sourceType: 'api', location: 'seed://northlane' },
    [
      {
        externalId: 'north-outer-1',
        title: 'Utility Overshirt',
        category: 'outerwear',
        price: 85,
        currency: 'USD',
        imageUrl: '/placeholder-outer.jpg',
        sourceUrl: 'https://example.com/north/overshirt',
        color: 'olive',
        sizeAvailability: ['M', 'L'],
        tags: ['utility', 'layering'],
        styleTags: ['streetwear', 'travel'],
        trendScore: 0.66,
        availability: true,
        raw: { source: 'north-seed' }
      }
    ]
  ),
  createAdapter(
    'Cinder Collective',
    'cinder-collective',
    { sourceType: 'affiliate', location: 'seed://cinder.xml' },
    [
      {
        externalId: 'cinder-shoes-1',
        title: 'Block Heel Sandal',
        category: 'shoes',
        price: 68,
        currency: 'USD',
        imageUrl: '/placeholder-shoes.jpg',
        sourceUrl: 'https://example.com/cinder/block-heel',
        color: 'cream',
        sizeAvailability: ['6', '7', '8'],
        tags: ['occasion', 'heel'],
        styleTags: ['wedding guest', 'date night'],
        trendScore: 0.59,
        availability: true,
        raw: { source: 'cinder-seed' }
      }
    ]
  )
];
