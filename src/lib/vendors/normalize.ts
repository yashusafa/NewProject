import { mockVendorAdapters } from '@/lib/vendors/mockVendors';
import type { NormalizedProduct } from '@/lib/vendors/types';

export async function ingestAndNormalizeProducts(): Promise<NormalizedProduct[]> {
  const batches = await Promise.all(
    mockVendorAdapters.map(async (adapter) => {
      const sourceRows = await adapter.fetchProducts();
      return sourceRows.map((row) => ({
        id: `${adapter.slug}:${row.externalId}`,
        vendorName: adapter.vendorName,
        vendorSlug: adapter.slug,
        title: row.title,
        category: row.category,
        price: row.price,
        currency: row.currency,
        imageUrl: row.imageUrl,
        sourceUrl: row.sourceUrl,
        color: row.color,
        tags: row.tags,
        styleTags: row.styleTags,
        trendScore: row.trendScore,
        availability: row.availability,
        normalizedMetadata: {
          sourceType: adapter.feed.sourceType,
          sourceLocation: adapter.feed.location,
          raw: row.raw
        }
      }));
    })
  );

  return batches.flat();
}
