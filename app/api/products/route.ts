import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Maps quiz answers to DB-compatible filter values
function mapSkinType(skinType: string): string {
  const map: Record<string, string> = {
    'Oily': 'oily',
    'Dry': 'dry',
    'Combination': 'combo',
    'Normal': 'normal',
    'Sensitive': 'sensitive',
  };
  return map[skinType] || skinType.toLowerCase();
}

function mapAcneTypes(acneType: string): string[] {
  // Quiz stores acne type as a single string, map to DB values
  const types: string[] = [];
  const lower = acneType.toLowerCase();
  if (lower.includes('cystic')) types.push('cystic');
  if (lower.includes('comedonal') || lower.includes('blackhead') || lower.includes('whitehead')) types.push('comedonal');
  if (lower.includes('inflammatory') || lower.includes('papule') || lower.includes('pustule')) types.push('inflammatory');
  if (lower.includes('scar') || lower.includes('hyperpigmentation')) types.push('scarring');
  // Default fallback
  if (types.length === 0) types.push('comedonal', 'inflammatory');
  return types;
}

// Scores a product based on how well it matches the user's quiz answers
function scoreProduct(
  product: any,
  skinType: string,
  acneTypes: string[],
  sensitivity: string,
  concerns: string[]
): number {
  let score = 0;

  // Skin type match (highest weight)
  if (product.skinTypes?.includes(skinType)) score += 10;

  // Acne type overlap
  const acneOverlap = acneTypes.filter((t: string) => product.acneTypes?.includes(t)).length;
  score += acneOverlap * 5;

  // Sensitivity bonus — prefer gentler products
  if (sensitivity === 'Easily' || sensitivity === 'Sometimes') {
    if (product.skinTypes?.includes('sensitive')) score += 4;
  }

  // Concern overlap
  const concernOverlap = concerns.filter((c: string) => product.concerns?.includes(c)).length;
  score += concernOverlap * 3;

  return score;
}

// Derives skin concerns from quiz answers for matching
function deriveConcerns(answers: {
  skinType: string;
  sensitivity: string;
  acneType: string;
  severity: string;
}): string[] {
  const concerns: string[] = [];
  if (answers.skinType === 'Oily') concerns.push('excess oil', 'pores');
  if (answers.skinType === 'Dry') concerns.push('dryness');
  if (answers.sensitivity === 'Easily' || answers.sensitivity === 'Sometimes') concerns.push('sensitivity');
  if (answers.acneType.toLowerCase().includes('scar')) concerns.push('hyperpigmentation', 'scarring');
  concerns.push('acne'); // everyone taking this quiz has acne concerns
  return concerns;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skinType, sensitivity, acneType, currentProducts, budget, severity } = body;

    if (!skinType) {
      return NextResponse.json({ error: 'skinType is required' }, { status: 400 });
    }

    const mappedSkinType = mapSkinType(skinType);
    const mappedAcneTypes = mapAcneTypes(acneType || '');
    const concerns = deriveConcerns({ skinType, sensitivity, acneType, severity });

    // Fetch all products from DB
    const allProducts = await prisma.product.findMany();

    // Group by productType
    const byType: Record<string, any[]> = {};
    for (const product of allProducts) {
      const type = product.productType || 'other';
      if (!byType[type]) byType[type] = [];
      byType[type].push(product);
    }

    // Score and sort each product type
    const scored: Record<string, any[]> = {};
    for (const [type, products] of Object.entries(byType)) {
      scored[type] = products
        .map((p) => ({
          ...p,
          _score: scoreProduct(p, mappedSkinType, mappedAcneTypes, sensitivity, concerns),
        }))
        .filter((p) => p._score > 0) // only include products with some relevance
        .sort((a, b) => b._score - a._score);
    }

    // Build routine step → product mapping
    // Each step requests a productType; we return the top match
    const isOily = skinType === 'Oily';
    const isDry = skinType === 'Dry';
    const isCombo = skinType === 'Combination';
    const isSensitive = sensitivity === 'Easily' || sensitivity === 'Sometimes';
    const onRetinoid = currentProducts?.includes('Tretinoin') || currentProducts?.includes('Differin');

    // Helper: pick best product for a type, with optional AM/PM filter
    const pick = (type: string, timeOfDay?: 'am' | 'pm') => {
      let candidates = scored[type] || [];
      if (timeOfDay === 'am') candidates = candidates.filter((p) => p.amUse);
      if (timeOfDay === 'pm') candidates = candidates.filter((p) => p.pmUse);
      const top = candidates[0];
      if (!top) return null;
      return {
        id: top.id,
        name: top.name,
        brand: top.brand,
        price: top.priceRange,
        imageUrl: top.imageUrl,
        url: top.purchaseLink,
        description: top.description,
      };
    };

    // AM routine products
    const amProducts: Record<string, any> = {
      Cleanser: pick('cleanser', 'am'),
      Serum: pick('serum', 'am'),
      Moisturizer: pick('moisturizer', 'am'),
      SPF: pick('spf', 'am') || pick('sunscreen', 'am'),
    };

    // PM routine products
    const pmProducts: Record<string, any> = {
      Cleanser: pick('cleanser', 'pm'),
      Treatment: pick('treatment', 'pm') || pick('retinoid', 'pm') || pick('exfoliant', 'pm'),
      Moisturizer: pick('moisturizer', 'pm'),
    };

    return NextResponse.json({
      am: amProducts,
      pm: pmProducts,
      // Also return full scored lists so the frontend could show alternatives
      allScored: Object.fromEntries(
        Object.entries(scored).map(([type, products]) => [
          type,
          products.slice(0, 5).map(({ _score, ...p }) => ({
            ...p,
            matchScore: _score,
          })),
        ])
      ),
    });
  } catch (error) {
    console.error('Product recommendation error:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}