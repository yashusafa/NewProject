import { PrismaClient, Category, StyleMode } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@fitbudget.dev' },
    update: { displayName: 'Demo User' },
    create: { email: 'demo@fitbudget.dev', displayName: 'Demo User' }
  });

  await prisma.avatarProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id, height: '170 cm', bodyBuild: 'athletic', skinTone: 'medium', avatarBase: 'default' }
  });

  const budget = await prisma.budgetProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      minBudget: 120,
      maxBudget: 250,
      includedCategories: [Category.tops, Category.bottoms, Category.shoes],
      styleMode: StyleMode.casual,
      trendPreference: 50
    }
  });

  const vendors = [
    { name: 'Atlas Apparel', slug: 'atlas-apparel' },
    { name: 'Northlane Studio', slug: 'northlane-studio' },
    { name: 'Cinder Collective', slug: 'cinder-collective' }
  ];

  for (const v of vendors) {
    await prisma.vendor.upsert({
      where: { slug: v.slug },
      update: {},
      create: { name: v.name, slug: v.slug, sourceType: 'mock-json', sourceMetadata: { seeded: true } }
    });
  }

  const atlas = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'atlas-apparel' } });
  const north = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'northlane-studio' } });
  const cinder = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'cinder-collective' } });

  const products = [
    { vendorId: atlas.id, title: 'Relaxed Linen Shirt', sourceUrl: 'https://example.com/a1', imageUrl: '/placeholder-top.jpg', price: 48, category: Category.tops, styleTags: [StyleMode.casual, StyleMode.minimalist] },
    { vendorId: north.id, title: 'Utility Overshirt', sourceUrl: 'https://example.com/n1', imageUrl: '/placeholder-outer.jpg', price: 85, category: Category.outerwear, styleTags: [StyleMode.streetwear, StyleMode.travel] },
    { vendorId: cinder.id, title: 'Block Heel Sandal', sourceUrl: 'https://example.com/c1', imageUrl: '/placeholder-shoes.jpg', price: 68, category: Category.shoes, styleTags: [StyleMode.date_night, StyleMode.wedding_guest] }
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        ...p,
        currency: 'USD',
        tags: ['mvp'],
        trendLabel: 'balanced',
        trendScore: 0.5,
        availability: true,
        normalizedMetadata: { seeded: true }
      }
    });
  }

  const product = await prisma.product.findFirstOrThrow();
  await prisma.productVariant.create({
    data: { productId: product.id, size: 'M', color: 'Neutral', availability: true }
  });

  await prisma.outfit.create({
    data: {
      userId: user.id,
      title: 'Demo Casual Look',
      styleMode: StyleMode.casual,
      budgetProfileId: budget.id,
      isSaved: true
    }
  });
}

main().finally(async () => prisma.$disconnect());
