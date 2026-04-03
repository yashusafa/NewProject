import { PrismaClient, Category, StyleMode } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@fitbudget.dev' },
    update: { displayName: 'Demo User' },
    create: { email: 'demo@fitbudget.dev', displayName: 'Demo User', passwordHash: 'local-demo' }
  });

  await prisma.avatarProfile.upsert({
    where: { userId: user.id },
    update: {
      height: '170 cm',
      bodyBuild: 'athletic',
      skinTone: 'medium',
      avatarBase: 'classic'
    },
    create: {
      userId: user.id,
      height: '170 cm',
      bodyBuild: 'athletic',
      skinTone: 'medium',
      avatarBase: 'classic',
      preferences: { defaultPalette: 'neutral' }
    }
  });

  const budget = await prisma.budgetProfile.upsert({
    where: { userId: user.id },
    update: {
      minBudget: 120,
      maxBudget: 260,
      includedCategories: [Category.tops, Category.bottoms, Category.shoes],
      styleMode: StyleMode.casual,
      trendPreference: 50
    },
    create: {
      userId: user.id,
      minBudget: 120,
      maxBudget: 260,
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
      update: { sourceType: 'mock-json', sourceMetadata: { version: 1 } },
      create: { name: v.name, slug: v.slug, sourceType: 'mock-json', sourceMetadata: { version: 1 } }
    });
  }

  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const atlas = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'atlas-apparel' } });
  const north = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'northlane-studio' } });
  const cinder = await prisma.vendor.findUniqueOrThrow({ where: { slug: 'cinder-collective' } });

  const products = await prisma.$transaction([
    prisma.product.create({
      data: {
        vendorId: atlas.id,
        title: 'Relaxed Linen Shirt',
        sourceUrl: 'https://example.com/atlas/linen-shirt',
        imageUrl: '/placeholder-top.jpg',
        price: 48,
        currency: 'USD',
        category: Category.tops,
        color: 'sand',
        tags: ['linen', 'breathable'],
        styleTags: [StyleMode.casual, StyleMode.minimalist, StyleMode.travel],
        trendLabel: 'timeless',
        trendScore: 0.42,
        availability: true,
        normalizedMetadata: { feedVersion: 'v1' }
      }
    }),
    prisma.product.create({
      data: {
        vendorId: north.id,
        title: 'Utility Overshirt',
        sourceUrl: 'https://example.com/north/overshirt',
        imageUrl: '/placeholder-outer.jpg',
        price: 85,
        currency: 'USD',
        category: Category.outerwear,
        color: 'olive',
        tags: ['utility', 'layering'],
        styleTags: [StyleMode.streetwear, StyleMode.travel],
        trendLabel: 'current',
        trendScore: 0.66,
        availability: true,
        normalizedMetadata: { feedVersion: 'v1' }
      }
    }),
    prisma.product.create({
      data: {
        vendorId: cinder.id,
        title: 'Block Heel Sandal',
        sourceUrl: 'https://example.com/cinder/block-heel',
        imageUrl: '/placeholder-shoes.jpg',
        price: 68,
        currency: 'USD',
        category: Category.shoes,
        color: 'cream',
        tags: ['heel', 'occasion'],
        styleTags: [StyleMode.date_night, StyleMode.wedding_guest],
        trendLabel: 'balanced',
        trendScore: 0.59,
        availability: true,
        normalizedMetadata: { feedVersion: 'v1' }
      }
    })
  ]);

  for (const p of products) {
    await prisma.productVariant.createMany({
      data: [
        { productId: p.id, size: 'S', color: p.color ?? 'Default', availability: true },
        { productId: p.id, size: 'M', color: p.color ?? 'Default', availability: true },
        { productId: p.id, size: 'L', color: p.color ?? 'Default', availability: true }
      ]
    });
  }

  const outfit = await prisma.outfit.create({
    data: {
      userId: user.id,
      title: 'Demo Casual Look',
      styleMode: StyleMode.casual,
      budgetProfileId: budget.id
    }
  });

  await prisma.savedOutfit.create({
    data: {
      userId: user.id,
      outfitId: outfit.id,
      title: 'Demo Casual Look Snapshot',
      styleMode: StyleMode.casual,
      snapshotJson: {
        notes: 'seeded snapshot',
        budgetWindow: [120, 260]
      }
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
