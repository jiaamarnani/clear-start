import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed your database here

  //CLEANSERS 
  // Cetaphil Gentle Skin Cleanser
  await prisma.product.create({
    data: {
      name: "Gentle Skin Cleanser",
      brand: "Cetaphil",
      priceRange: "$",
      skinTypes: ["dry", "combo", "sensitive"],
      concerns: ["dryness", "sensitivity"],
      acneTypes: ["comedonal", "inflammatory"],
      ingredients: ["glycerin", "niacinamide", "panthenol"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cetaphil.com/dw/image/v2/BFNV_PRD/on/demandware.static/-/Sites-cetaphil-us-master-catalog/default/dw2fc32e8f/images/product/gentle-skin-cleanser/Cetaphil_20oz_Gentle_Skin_Cleanser_Front_US.png",
      purchaseLink: "https://www.cetaphil.com/us/cleansers/gentle-skin-cleanser/302990110227.html",
      description: "Very gentle, non-foaming cleanser for dry to combo sensitive skin. Works perfectly with tretinoin and harsh actives without stripping. A go-to when using strong treatments!"
    }
  });

  // La Roche-Posay Effaclar Cleanser
  await prisma.product.create({
    data: {
      name: "Effaclar Medicated Gel Cleanser",
      brand: "La Roche-Posay",
      priceRange: "$$",
      skinTypes: ["oily", "combo"],
      concerns: ["acne", "excess oil"],
      acneTypes: ["comedonal", "inflammatory"],
      ingredients: ["salicylic acid", "zinc pidolate"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/america/us/products/effaclar/effaclar-medicated-gel-cleanser/effaclar-medicated-gel-cleanser-200ml.jpg",
      purchaseLink: "https://www.laroche-posay.us/our-products/face/face-wash/effaclar-medicated-gel-cleanser-for-acne-prone-skin-3337875545815.html",
      description: "Salicylic acid cleanser that clears breakouts and reduces excess oil without over-drying. Can be stripping, use once a day!"
    }
  });

  // Youth To The People Superfood Cleanser
  await prisma.product.create({
    data: {
      name: "Superfood Antioxidant Cleanser",
      brand: "Youth To The People",
      priceRange: "$$",
      skinTypes: ["normal", "combo", "oily"],
      concerns: ["dullness", "pores"],
      acneTypes: ["comedonal"],
      ingredients: ["kale extract", "spinach extract", "green tea"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.sephora.com/productimages/sku/s1863588-main-zoom.jpg",
      purchaseLink: "https://www.youthtothepeople.com/products/superfood-antioxidant-cleanser",
      description: "Award-winning gel cleanser with cold-pressed antioxidants. Removes makeup, prevents pore buildup, and supports skin's pH balance. Can be stripping, use once a day!"
    }
  });

  // La Roche-Posay Toleriane Hydrating Cleanser
  await prisma.product.create({
    data: {
      name: "Toleriane Hydrating Gentle Cleanser",
      brand: "La Roche-Posay",
      priceRange: "$$",
      skinTypes: ["dry", "normal", "sensitive"],
      concerns: ["dryness", "sensitivity"],
      acneTypes: [],
      ingredients: ["niacinamide", "ceramide-3", "glycerin", "thermal water"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/america/us/products/toleriane/toleriane-hydrating-gentle-cleanser/toleriane-hydrating-gentle-face-cleanser-400ml.jpg",
      purchaseLink: "https://www.laroche-posay.us/our-products/face/face-wash/toleriane-hydrating-gentle-facial-cleanser-tolerianehydratinggentlefacialcleanser.html",
      description: "Creamy, non-foaming cleanser that removes makeup and impurities while maintaining skin's natural moisture barrier. Perfect for dry, sensitive skin."
    }
  });

  // La Roche-Posay Toleriane Purifying Foaming Cleanser
  await prisma.product.create({
    data: {
      name: "Toleriane Purifying Foaming Facial Cleanser",
      brand: "La Roche-Posay",
      priceRange: "$$",
      skinTypes: ["oily", "combo", "sensitive"],
      concerns: ["excess oil", "sensitivity"],
      acneTypes: ["comedonal"],
      ingredients: ["niacinamide", "ceramide-3", "glycerin", "thermal water"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/america/us/products/toleriane/toleriane-purifying-foaming-facial-cleanser/toleriane-purifying-foaming-face-wash-400ml.jpg",
      purchaseLink: "https://www.laroche-posay.us/our-products/face/face-wash/toleriane-purifying-foaming-face-wash-tolerianepurifyingfoamingfacialwash.html",
      description: "Gentle foaming cleanser for oily, sensitive skin. Removes dirt and excess oil while maintaining moisture barrier. Won't strip or irritate."
    }
  });

  // Anua Heartleaf Pore Deep Cleansing Foam
  await prisma.product.create({
    data: {
      name: "Heartleaf Quercetinol Pore Deep Cleansing Foam",
      brand: "Anua",
      priceRange: "$",
      skinTypes: ["oily", "combo", "acne-prone"],
      concerns: ["pores", "excess oil", "acne"],
      acneTypes: ["comedonal"],
      ingredients: ["heartleaf extract", "salicylic acid", "quercetin"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://anua.com/cdn/shop/files/3_a60fa2b5-32e6-4eba-b7ae-ad89eb5aa0f3.jpg",
      purchaseLink: "https://anua.com/products/heartleaf-quercetinol-pore-deep-cleansing-foam",
      description: "Korean foam cleanser with gentle BHA that deep cleans pores and calms irritation. Contains soothing heartleaf extract for sensitive, acne-prone skin."
    }
  });

  // PanOxyl 10% Benzoyl Peroxide Wash
  await prisma.product.create({
    data: {
      name: "Acne Foaming Wash 10% Benzoyl Peroxide",
      brand: "PanOxyl",
      priceRange: "$",
      skinTypes: ["oily", "acne-prone"],
      concerns: ["severe acne", "stubborn breakouts"],
      acneTypes: ["comedonal", "cystic", "inflammatory"],
      ingredients: ["benzoyl peroxide 10%", "glycerin"],
      productType: "cleanser",
      amUse: false,
      pmUse: true,
      imageUrl: "https://panoxyl.com/wp-content/uploads/2023/03/PanOxyl-10-Foaming-Acne-Wash-Front.png",
      purchaseLink: "https://panoxyl.com/acne-products/acne-foaming-wash-benzoyl-peroxide/",
      description: "MAXIMUM STRENGTH cleanser with 10% benzoyl peroxide. Kills 99% of acne bacteria. Very strong - DO NOT use with other actives like tretinoin, retinol, or acids. Use alone or you'll destroy your skin barrier!"
    }
  });

  // CeraVe Hydrating Facial Cleanser
  await prisma.product.create({
    data: {
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      priceRange: "$",
      skinTypes: ["dry", "normal", "sensitive"],
      concerns: ["dryness"],
      acneTypes: [],
      ingredients: ["hyaluronic acid", "ceramides", "glycerin"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cerave.com/sites/cerave_us_2/files/styles/product_large/public/2022-08/Hydrating_Facial_Cleanser_12oz_0.png",
      purchaseLink: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser",
      description: "Affordable drugstore favorite with MVE technology that releases ceramides over 24 hours. Removes makeup without stripping. National Eczema Association approved."
    }
  });

  // Vanicream Gentle Facial Cleanser
  await prisma.product.create({
    data: {
      name: "Gentle Facial Cleanser",
      brand: "Vanicream",
      priceRange: "$",
      skinTypes: ["dry", "sensitive", "eczema-prone"],
      concerns: ["extreme sensitivity", "eczema", "reactive skin"],
      acneTypes: [],
      ingredients: ["glycerin"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.vanicream.com/uploads/products/vanicream-gentle-facial-cleanser.png",
      purchaseLink: "https://www.vanicream.com/product/vanicream-facial-cleanser",
      description: "Ultra-gentle, soap-free cleanser with minimal ingredients. Free of dyes, fragrance, parabens, sulfates. Perfect for eczema, rosacea, or extremely reactive skin. Dermatologist's top pick for sensitive skin."
    }
  });

// COSRX Low pH Good Morning Gel Cleanser
  await prisma.product.create({
    data: {
      name: "Low pH Good Morning Gel Cleanser",
      brand: "COSRX",
      priceRange: "$",
      skinTypes: ["oily", "combo", "normal", "sensitive"],
      concerns: ["pores", "excess oil", "acne"],
      acneTypes: ["comedonal"],
      ingredients: ["tea tree oil", "BHA", "betaine salicylate"],
      productType: "cleanser",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cosrx.com/cdn/shop/products/COSRX-Low-pH-Good-Morning-Gel-Cleanser-150ml.jpg",
      purchaseLink: "https://www.cosrx.com/products/low-ph-good-morning-gel-cleanser",
      description: "Cult-favorite K-beauty cleanser with pH 5.5 that matches skin's natural pH. Gentle BHA and tea tree oil refine pores without stripping. Perfect morning cleanser for all skin types."
    }
  });

  //CLEANSING BALMS/OILS
  // JUNO & Co. Clean 10 Cleansing Balm
  await prisma.product.create({
    data: {
      name: "Clean 10 Cleansing Balm",
      brand: "JUNO & Co.",
      priceRange: "$",
      skinTypes: ["normal", "dry", "combo", "oily", "sensitive"],
      concerns: ["makeup removal", "dark spots", "dullness"],
      acneTypes: [],
      ingredients: ["japanese pearl barley", "vitamin E", "orange peel oil"],
      productType: "oil cleanser",
      amUse: false,
      pmUse: true,
      imageUrl: "https://www.junoco.com/cdn/shop/products/Clean10-Front_1024x1024.jpg",
      purchaseLink: "https://www.junoco.com/products/clean-10-cleansing-balm",
      description: "Minimalist cleansing balm with only 10 ingredients. Melts away waterproof makeup and SPF without stripping. Star ingredient is Japanese pearl barley that brightens and reduces dark spots. Affordable, vegan, and works for ALL skin types."
    }
  });

    // Anua Heartleaf Pore Control Cleansing Oil
  await prisma.product.create({
    data: {
      name: "Heartleaf Pore Control Cleansing Oil",
      brand: "Anua",
      priceRange: "$",
      skinTypes: ["oily", "combo", "acne-prone", "sensitive"],
      concerns: ["blackheads", "clogged pores", "excess oil"],
      acneTypes: ["comedonal"],
      ingredients: ["heartleaf extract", "jojoba oil", "grape seed oil"],
      productType: "oil cleanser",
      amUse: false,
      pmUse: true,
      imageUrl: "https://anua.com/cdn/shop/files/2_c4e47f2f-f5d6-4b8f-a0fa-6d4f25aef83d.jpg",
      purchaseLink: "https://anua.com/products/heartleaf-pore-control-cleansing-oil-200ml",
      description: "Lightweight oil cleanser that removes makeup and blackheads without clogging pores. Non-comedogenic and gentle on eyes. Perfect for acne-prone and oily skin."
    }
  });

  // DHC Deep Cleansing Oil
  await prisma.product.create({
    data: {
      name: "Deep Cleansing Oil",
      brand: "DHC",
      priceRange: "$$",
      skinTypes: ["dry", "normal", "combo"],
      concerns: ["dryness", "makeup removal"],
      acneTypes: [],
      ingredients: ["olive oil", "vitamin E", "rosemary extract"],
      productType: "oil cleanser",
      amUse: false,
      pmUse: true,
      imageUrl: "https://www.dhccare.com/media/catalog/product/cache/1/image/1200x1200/602f0fa2c1f0d1ba5e241f914e856ff9/d/h/dhc_deep_cleansing_oil_6_8oz.jpg",
      purchaseLink: "https://www.dhccare.com/deep-cleansing-oil",
      description: "Japanese cult favorite with olive oil. Bestselling oil cleanser that emulsifies easily. Removes waterproof makeup while nourishing dry skin. Great for sensitive skin."
    }
  });

  //TREATMENTS

  // Paula's Choice 2% BHA Liquid Exfoliant
  await prisma.product.create({
    data: {
      name: "Skin Perfecting 2% BHA Liquid Exfoliant",
      brand: "Paula's Choice",
      priceRange: "$$",
      skinTypes: ["oily", "combo", "normal", "acne-prone"],
      concerns: ["blackheads", "pores", "uneven texture", "oil control"],
      acneTypes: ["comedonal", "inflammatory"],
      ingredients: ["salicylic acid 2%", "green tea extract"],
      productType: "treatment",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.paulaschoice.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwe929fc3e/images/product/2010_bottle_201_201-2010_2.jpg",
      purchaseLink: "https://www.paulaschoice.com/skin-perfecting-2pct-bha-liquid-exfoliant/201-2010.html",
      description: "Cult-favorite BHA toner that unclogs pores, controls oil, and clears blackheads/whiteheads. Clinically proven to reduce pores in 1 week. Gentle enough for daily use. Perfect for comedonal and inflammatory acne."
    }
  });

  // Differin Gel
  await prisma.product.create({
    data: {
      name: "Adapalene Gel 0.1% Acne Treatment",
      brand: "Differin",
      priceRange: "$",
      skinTypes: ["oily", "combo", "normal", "acne-prone"],
      concerns: ["textured bumps", "closed comedones", "acne prevention"],
      acneTypes: ["comedonal", "inflammatory", "cystic"],
      ingredients: ["adapalene 0.1%"],
      productType: "treatment",
      amUse: false,
      pmUse: true,
      imageUrl: "https://differin.com/wp-content/uploads/2021/07/Differin-Gel-Tube-Front.png",
      purchaseLink: "https://differin.com/shop/differin-gel/",
      description: "OTC retinoid for textured skin and stubborn acne. Regulates cell turnover to prevent clogged pores. Clinical studies show 87% reduction in acne after 12 weeks. USE WITH CAUTION - can cause purging, dryness. MUST use SPF daily. Start slow (3x/week)."
    }
  });

  // Anua Niacinamide 10% + TXA 4% Serum
  await prisma.product.create({
    data: {
      name: "Niacinamide 10% + TXA 4% Serum",
      brand: "Anua",
      priceRange: "$$",
      skinTypes: ["all"],
      concerns: ["acne scars", "PIH", "dark spots", "dullness", "uneven tone"],
      acneTypes: [],
      ingredients: ["niacinamide 10%", "tranexamic acid 4%", "arbutin", "ceramides", "hyaluronic acid"],
      productType: "treatment",
      amUse: true,
      pmUse: true,
      imageUrl: "https://anua.com/cdn/shop/files/1_f9c4a6e5-7fa1-4d1f-98a7-c9a2e6f8e3d9.jpg",
      purchaseLink: "https://anua.com/products/niacinamide-10-txa-4-serum-2",
      description: "Viral K-beauty serum for fading acne scars and PIH. Triple threat: 10% niacinamide, 4% tranexamic acid, 2% arbutin. Lightweight, hydrating, works for all skin types. Perfect for post-acne marks."
    }
  });

  // Paula's Choice 10% Azelaic Acid Booster
  await prisma.product.create({
    data: {
      name: "10% Azelaic Acid Booster",
      brand: "Paula's Choice",
      priceRange: "$$$",
      skinTypes: ["all", "sensitive", "rosacea-prone"],
      concerns: ["redness", "dark spots", "hormonal acne", "uneven tone"],
      acneTypes: ["hormonal", "fungal"],
      ingredients: ["azelaic acid 10%", "salicylic acid 0.5%", "licorice root extract"],
      productType: "treatment",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.paulaschoice.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-pc-catalog/default/dw82a8e8e2/images/product/775_bottle_775_7750.jpg",
      purchaseLink: "https://www.paulaschoice.com/10pct-azelaic-acid-booster/775.html",
      description: "Multi-tasking treatment for hormonal/fungal acne, redness, and dark spots. Azelaic acid is anti-inflammatory, antibacterial, AND brightening. Great for rosacea and sensitive skin. Can mix with moisturizer or use alone."
    }
  });

  // Neutrogena On-The-Spot Benzoyl Peroxide 2.5%
  await prisma.product.create({
    data: {
      name: "On-The-Spot Acne Treatment 2.5%",
      brand: "Neutrogena",
      priceRange: "$",
      skinTypes: ["oily", "combo", "acne-prone"],
      concerns: ["cystic acne", "inflamed pimples", "spot treatment"],
      acneTypes: ["cystic", "inflammatory"],
      ingredients: ["benzoyl peroxide 2.5%"],
      productType: "treatment",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.neutrogena.com/dw/image/v2/BFVX_PRD/on/demandware.static/-/Sites-neutrogena_us-Library/default/dw0f29cef2/productimages/680179-On-The-Spot-Acne-Treatment_FRONT.jpg",
      purchaseLink: "https://www.neutrogena.com/products/skincare/on-the-spot-acne-treatment/6801790",
      description: "Gentle benzoyl peroxide spot treatment for cystic acne. 2.5% is proven as effective as 10% but way less irritating. Vanishing formula absorbs quickly. Use on individual pimples, not whole face."
    }
  });

  // De La Cruz Sulfur Ointment 10%
  await prisma.product.create({
    data: {
      name: "Sulfur Ointment 10% Acne Treatment",
      brand: "De La Cruz",
      priceRange: "$",
      skinTypes: ["oily", "acne-prone"],
      concerns: ["fungal acne", "hormonal acne", "cystic acne"],
      acneTypes: ["fungal", "hormonal", "cystic"],
      ingredients: ["sulfur 10%"],
      productType: "treatment",
      amUse: false,
      pmUse: true,
      imageUrl: "https://dlclabs.com/wp-content/uploads/2020/09/Sulfur-Ointment-5.5oz-1.jpg",
      purchaseLink: "https://dlclabs.com/product/sulfur-ointment-acne-treatment/",
      description: "Budget fungal acne fighter. Use as 10-min mask 2-3x/week. Anti-fungal, antibacterial, reduces oil production. WARNING: smells like rotten eggs. Very drying - don't use with other actives. Great for hormonal/cystic acne too."
    }
  });

  //MOISTURIZERS
  // Cetaphil Daily Hydrating Lotion
  await prisma.product.create({
    data: {
      name: "Daily Hydrating Lotion",
      brand: "Cetaphil",
      priceRange: "$",
      skinTypes: ["combo", "oily", "sensitive"],
      concerns: ["dryness", "dehydration"],
      acneTypes: [],
      ingredients: ["hyaluronic acid", "glycerin"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cetaphil.com/dw/image/v2/BFNV_PRD/on/demandware.static/-/Sites-cetaphil-us-master-catalog/default/dwa782d8af/images/product/daily-hydrating-lotion/Cetaphil_DailyHydratingLotion_3oz_Front_US.png",
      purchaseLink: "https://www.cetaphil.com/us/moisturizers/daily-hydrating-lotion/302993889038.html",
      description: "Lightweight, oil-free lotion with hyaluronic acid for combo/oily skin. 24-hour hydration without clogging pores. Fast-absorbing, non-greasy. Perfect under makeup."
    }
  });

  // La Roche-Posay Toleriane Double Repair
  await prisma.product.create({
    data: {
      name: "Toleriane Double Repair Face Moisturizer",
      brand: "La Roche-Posay",
      priceRange: "$$",
      skinTypes: ["all", "sensitive", "dry"],
      concerns: ["barrier repair", "dryness", "sensitivity"],
      acneTypes: [],
      ingredients: ["ceramide-3", "niacinamide", "glycerin", "thermal water"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/america/us/products/toleriane/toleriane-double-repair-face-moisturizer/toleriane-double-repair-moisturizer-75ml.jpg",
      purchaseLink: "https://www.laroche-posay.us/our-products/face/face-moisturizer/toleriane-double-repair-face-moisturizer-tolerianedoublerepair.html",
      description: "Holy grail barrier repair moisturizer. Repairs skin barrier in 1 hour, 48-hour hydration. Perfect for sensitive skin or when using actives like tretinoin. Lightweight cream texture."
    }
  });

  // Neutrogena Hydro Boost Water Gel
  await prisma.product.create({
    data: {
      name: "Hydro Boost Water Gel",
      brand: "Neutrogena",
      priceRange: "$",
      skinTypes: ["oily", "combo", "normal"],
      concerns: ["dehydration", "dullness"],
      acneTypes: [],
      ingredients: ["hyaluronic acid", "glycerin"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.neutrogena.com/dw/image/v2/BFVX_PRD/on/demandware.static/-/Sites-neutrogena_us-Library/default/dw53ea0a77/productimages/680-179-52-00_FRONT.png",
      purchaseLink: "https://www.neutrogena.com/products/skincare/neutrogena-hydro-boost-water-gel-with-hyaluronic-acid/6811047",
      description: "Ultra-lightweight gel that absorbs instantly. Hyaluronic acid locks in moisture for 48 hours. Oil-free, non-comedogenic. Perfect for oily skin that needs hydration without heaviness."
    }
  });

  // COSRX Oil-Free Ultra-Moisturizing Lotion
  await prisma.product.create({
    data: {
      name: "Oil-Free Ultra-Moisturizing Lotion with Birch Sap",
      brand: "COSRX",
      priceRange: "$$",
      skinTypes: ["oily", "combo", "sensitive"],
      concerns: ["dehydration", "irritation", "redness"],
      acneTypes: [],
      ingredients: ["birch sap 70%", "hyaluronic acid", "panthenol", "beta-glucan"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cosrx.com/cdn/shop/products/cosrx-oil-free-ultra-moisturizing-lotion-with-birch-sap_1024x1024.jpg",
      purchaseLink: "https://www.cosrx.com/products/oil-free-ultra-moisturizing-lotion-with-birch-sap",
      description: "K-beauty favorite with 70% birch sap instead of water. Packed with vitamins and antioxidants. Weightless, fast-absorbing. Great for oily/combo skin that needs serious hydration."
    }
  });

  // Dr. G R.E.D Blemish Clear Soothing Cream
  await prisma.product.create({
    data: {
      name: "R.E.D Blemish Clear Soothing Cream",
      brand: "Dr. G",
      priceRange: "$$",
      skinTypes: ["oily", "combo", "sensitive", "acne-prone"],
      concerns: ["redness", "irritation", "acne", "sensitivity"],
      acneTypes: ["inflammatory"],
      ingredients: ["10-cica complex", "madecassoside", "niacinamide", "centella asiatica"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://dr-g.com/cdn/shop/files/R.E.D_Blemish_Clear_Soothing_Cream.jpg",
      purchaseLink: "https://dr-g.com/products/dr-g-red-blemish-clear-soothing-cream",
      description: "Korean dermatologist-developed cream for acne-prone skin. 10-cica complex soothes redness and irritation. 100-hour hydration. Gel-cream texture absorbs fast, non-sticky. Perfect for sensitive, blemish-prone skin."
    }
  });

  // Experiment Beauty Buffer Jelly
  await prisma.product.create({
    data: {
      name: "Buffer Jelly",
      brand: "Experiment Beauty",
      priceRange: "$$$",
      skinTypes: ["all", "dry", "sensitive", "damaged barrier"],
      concerns: ["barrier repair", "extreme dryness", "irritation", "flakiness"],
      acneTypes: [],
      ingredients: ["ceramide NP 0.5%", "petrolatum 3%", "free fatty acids", "oat oil", "squalane"],
      productType: "moisturizer",
      amUse: false,
      pmUse: true,
      imageUrl: "https://experimentbeauty.com/cdn/shop/files/BufferJelly_2048x2048.png",
      purchaseLink: "https://experimentbeauty.com/products/buffer-jelly",
      description: "Hybrid oil-gel for intensive barrier repair. 'Micro-slugging' with 3% petrolatum + ceramides. Clinically proven: 63% less dryness, 38% smoother in 2 weeks. PERFECT for damaged barriers from tretinoin/actives. Lightweight, non-greasy. Use as last PM step."
    }
  });

  // CeraVe Moisturizing Cream 
  await prisma.product.create({
    data: {
      name: "Moisturizing Cream",
      brand: "CeraVe",
      priceRange: "$",
      skinTypes: ["dry", "very dry", "normal", "sensitive"],
      concerns: ["extreme dryness", "eczema", "barrier repair"],
      acneTypes: [],
      ingredients: ["ceramides", "hyaluronic acid", "petrolatum"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.cerave.com/sites/cerave_us_2/files/styles/product_large/public/2022-08/Moisturizing-Cream-453g.png",
      purchaseLink: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream",
      description: "Budget holy grail for dry skin. Rich cream with 3 essential ceramides + MVE technology for 24-hour hydration. Non-greasy despite thickness. Accepted by National Eczema Association. The tub lasts forever."
    }
  });

  // Belif True Cream Moisturizing Bomb
  await prisma.product.create({
    data: {
      name: "The True Cream Moisturizing Bomb",
      brand: "Belif",
      priceRange: "$$",
      skinTypes: ["dry", "normal", "combo"],
      concerns: ["dryness", "dullness", "uneven texture"],
      acneTypes: [],
      ingredients: ["peptides", "ceramides", "squalane", "oat extract", "macadamia oil"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.sephora.com/productimages/sku/s2696177-main-zoom.jpg",
      purchaseLink: "https://www.sephora.com/product/belif-the-true-cream-moisturizing-bomb-with-peptide-ceramide-P510119",
      description: "K-beauty cult favorite with whipped, cushiony texture that 'bursts' on skin. 48-hour hydration with apothecary herbs. Rich but absorbs completely without stickiness. Can use as 5-min emergency mask."
    }
  });

  // Tatcha Dewy Skin Cream 
  await prisma.product.create({
    data: {
      name: "The Dewy Skin Cream",
      brand: "Tatcha",
      priceRange: "$$$",
      skinTypes: ["dry", "normal"],
      concerns: ["dryness", "fine lines", "dullness", "loss of plumpness"],
      acneTypes: [],
      ingredients: ["hyaluronic acid", "japanese purple rice", "hadasei-3", "squalane"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.tatcha.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-tatcha-master/default/dw49f69a3d/images/product/CA06310T_CREAM_DEWY_SKIN_50ML_PRIMARY.jpg",
      purchaseLink: "https://www.tatcha.com/product/dewy-skin-cream-replenishing-and-plumping-moisturizer/CA06310T.html",
      description: "Luxury rich cream with Japanese superfoods. Delivers 3x instant hydration, visibly plumps fine lines. Purple rice antioxidants protect from aging. Comes with gold spoon. The dewy glow is REAL."
    }
  });

  // Illiyoon Ceramide Ato Concentrate Cream
  await prisma.product.create({
    data: {
      name: "Ceramide Ato Concentrate Cream",
      brand: "Illiyoon",
      priceRange: "$",
      skinTypes: ["dry", "very dry", "sensitive", "eczema-prone"],
      concerns: ["extreme dryness", "barrier repair", "sensitivity"],
      acneTypes: [],
      ingredients: ["ceramide PC-104", "cholesterol", "free fatty acids", "ceramide NP"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://cdn.shopify.com/s/files/1/0249/1218/products/illiyoon-ceramide-ato-concentrate-cream-200ml.jpg",
      purchaseLink: "https://www.yesstyle.com/en/illiyoon-ceramide-ato-concentrate-cream-200ml/info.html/pid.1054783977",
      description: "Budget K-beauty barrier repair hero. Patented Ceramide Skin Complex with ceramide capsules. 100-hour hydration. Thick but absorbs quickly. Vegan, fragrance-free. Perfect budget alternative to Buffer Jelly for damaged barriers."
    }
  });

  // Kiehl's Ultra Facial Cream 
  await prisma.product.create({
    data: {
      name: "Ultra Facial Cream",
      brand: "Kiehl's",
      priceRange: "$$",
      skinTypes: ["normal", "dry", "combo"],
      concerns: ["dryness", "dullness"],
      acneTypes: [],
      ingredients: ["squalane 4.5%", "glacial glycoprotein", "pro-ceramides"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.kiehls.com/dw/image/v2/AAQK_PRD/on/demandware.static/-/Sites-kiehls-master-catalog/default/dwf8e8c8f1/images/FACE/MOISTURIZERS/UFC/3605970360177-1.jpg",
      purchaseLink: "https://www.kiehls.com/skincare/face-moisturizers/ultra-facial-cream-with-squalane/622.html",
      description: "Kiehl's #1 bestseller. Lightweight texture with 72-hour hydration. Penetrates 15 layers deep. Non-greasy, absorbs fast. Perfect 'Goldilocks' moisturizer - not too light, not too heavy. Works for all skin types."
    }
  });

  // First Aid Beauty Ultra Repair Cream 
  await prisma.product.create({
    data: {
      name: "Ultra Repair Cream",
      brand: "First Aid Beauty",
      priceRange: "$$",
      skinTypes: ["dry", "very dry", "sensitive", "eczema-prone"],
      concerns: ["eczema", "extreme dryness", "irritation", "barrier damage"],
      acneTypes: [],
      ingredients: ["colloidal oatmeal 0.5%", "shea butter", "ceramides", "squalane"],
      productType: "moisturizer",
      amUse: true,
      pmUse: true,
      imageUrl: "https://www.sephora.com/productimages/sku/s1438961-main-zoom.jpg",
      purchaseLink: "https://www.firstaidbeauty.com/products/ultra-repair-cream-intense-hydration-new",
      description: "Cult favorite for eczema and severely dry skin. Colloidal oatmeal relieves itching and irritation. Strengthens barrier in 7 days. National Eczema Association approved. Rich but absorbs fast. Safe for face, body, and babies."
    }
  });
  
  //SUNSCREENS

  // Skin1004 Hyalu-Cica Water-Fit Sun Serum
  await prisma.product.create({
    data: {
      name: "Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
      brand: "Skin1004",
      priceRange: "$$",
      skinTypes: ["all", "dry", "sensitive"],
      concerns: ["sun protection", "hydration"],
      acneTypes: [],
      ingredients: ["centella asiatica", "hyaluronic acid", "niacinamide", "rice extract"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://www.skin1004.com/cdn/shop/files/NEWWATERFITSUNSERUM_01.jpg",
      purchaseLink: "https://www.skin1004.com/products/hyalu-cica-water-fit-sun-serum-uv",
      description: "Lightweight chemical sunscreen with centella + hyaluronic acid. No white cast, glowing finish. Feels like a serum, not sunscreen. Reef-safe, absorbs instantly. Perfect for daily use."
    }
  });

  // Innisfree Daily UV Defense SPF 36
  await prisma.product.create({
    data: {
      name: "Daily UV Defense Sunscreen SPF 36",
      brand: "Innisfree",
      priceRange: "$$",
      skinTypes: ["all", "normal", "combo"],
      concerns: ["sun protection", "hydration"],
      acneTypes: [],
      ingredients: ["green tea", "cica", "sunflower seed oil"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://us.innisfree.com/cdn/shop/files/innisfree-daily-uv-defense-sunscreen-broad-spectrum-spf-36-01.jpg",
      purchaseLink: "https://us.innisfree.com/products/daily-uv-defense-sunscreen",
      description: "Award-winning K-beauty sunscreen at Sephora. Invisible, dewy finish with zero white cast. Green tea + cica soothe and hydrate. Lightweight, no pilling. Perfect under makeup. Vegan, reef-safe."
    }
  });

  // Beauty of Joseon Relief Sun
  await prisma.product.create({
    data: {
      name: "Relief Sun: Rice + Probiotics SPF50+ PA++++",
      brand: "Beauty of Joseon",
      priceRange: "$$",
      skinTypes: ["all", "dry", "sensitive"],
      concerns: ["sun protection", "hydration", "brightening"],
      acneTypes: [],
      ingredients: ["rice extract 30%", "grain probiotics", "niacinamide"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://beautyofjoseon.com/cdn/shop/files/reliefSun50ml_01.jpg",
      purchaseLink: "https://beautyofjoseon.com/products/relief-sun-rice-probiotics",
      description: "VIRAL TikTok favorite. Feels like a creamy moisturizer, not sunscreen. 30% rice extract for brightening. Zero white cast, natural glow. Non-sticky even with multiple applications. Internet-famous for a reason."
    }
  });

  // Isntree Hyaluronic Acid Watery Sun Gel
  await prisma.product.create({
    data: {
      name: "Hyaluronic Acid Watery Sun Gel SPF50+ PA++++",
      brand: "Isntree",
      priceRange: "$$",
      skinTypes: ["all", "dry", "dehydrated"],
      concerns: ["sun protection", "dryness", "barrier support"],
      acneTypes: [],
      ingredients: ["8 types hyaluronic acid", "ceramides", "centella asiatica", "niacinamide"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://www.yesstyle.com/goods_images/1113241385.jpg",
      purchaseLink: "https://www.yesstyle.com/en/isntree-hyaluronic-acid-watery-sun-gel-50ml/info.html/pid.1113241385",
      description: "Hydrating chemical sunscreen with 8 types of HA. Watery gel texture, no white cast. Ceramides strengthen barrier. Dewy finish, perfect under makeup. Great for dry skin needing serious hydration + protection."
    }
  });

  // COSRX Aloe Soothing Sun Cream
  await prisma.product.create({
    data: {
      name: "Aloe Soothing Sun Cream SPF50+ PA+++",
      brand: "COSRX",
      priceRange: "$",
      skinTypes: ["all", "sensitive", "dry"],
      concerns: ["sun protection", "sensitivity", "hydration"],
      acneTypes: [],
      ingredients: ["aloe leaf extract", "centella asiatica", "niacinamide"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://www.cosrx.com/cdn/shop/products/cosrx-aloe-soothing-sun-cream-spf50-pa.jpg",
      purchaseLink: "https://www.cosrx.com/products/aloe-soothing-sun-cream",
      description: "Lightweight cream sunscreen with aloe for sensitive skin. Non-nano physical + chemical hybrid. Minimal white cast, soothing finish. Available at Target/Ulta. Great for everyday use."
    }
  });

  // Purito Daily Go-To Sunscreen
  await prisma.product.create({
    data: {
      name: "Daily Go-To Sunscreen SPF50+ PA++++",
      brand: "Purito",
      priceRange: "$$",
      skinTypes: ["all", "sensitive", "combo"],
      concerns: ["sun protection", "hydration"],
      acneTypes: [],
      ingredients: ["centella asiatica", "hyaluronic acid", "niacinamide"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://cdn.shopify.com/s/files/1/0438/6648/4550/products/daily-go-to-sunscreen_1024x1024.jpg",
      purchaseLink: "https://puritoen.com/product/daily-go-to-sunscreen/",
      description: "Milky essence texture that melts into skin. Zero white cast, dewy finish. Centella soothes while providing high protection. Lightweight enough to reapply throughout the day."
    }
  });

  // Round Lab Birch Juice Moisturizing Sunscreen
  await prisma.product.create({
    data: {
      name: "Birch Juice Moisturizing Sunscreen SPF50+ PA++++",
      brand: "Round Lab",
      priceRange: "$$",
      skinTypes: ["all", "dry", "sensitive"],
      concerns: ["sun protection", "dryness", "hydration"],
      acneTypes: [],
      ingredients: ["birch sap", "hyaluronic acid", "niacinamide"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://cdn.shopify.com/s/files/1/0573/8983/7390/products/roundlab-birch-juice-moisturizing-sunscreen.jpg",
      purchaseLink: "https://www.yesstyle.com/en/round-lab-birch-juice-moisturizing-sun-cream-spf50-pa-50ml/info.html/pid.1114883079",
      description: "Viral K-beauty sunscreen with birch sap for intense hydration. Creamy but lightweight texture. No white cast, natural finish. Perfect for dry skin that needs moisture + protection."
    }
  });

  // Anua Heartleaf Silky Moisture Sun Cream
  await prisma.product.create({
    data: {
      name: "Heartleaf Silky Moisture Sun Cream SPF50+ PA++++",
      brand: "Anua",
      priceRange: "$$",
      skinTypes: ["all", "sensitive", "acne-prone"],
      concerns: ["sun protection", "sensitivity", "redness"],
      acneTypes: [],
      ingredients: ["heartleaf extract", "panthenol", "beta-glucan"],
      productType: "sunscreen",
      amUse: true,
      pmUse: false,
      imageUrl: "https://anua.com/cdn/shop/files/1_d8e7a6f5-9c8a-4f2b-8e9d-5c4f3e2d1a0b.jpg",
      purchaseLink: "https://anua.com/products/heartleaf-silky-moisture-sun-cream",
      description: "Silky cream texture with heartleaf to calm irritation. Non-greasy, no white cast. Strengthens moisture barrier while protecting. Perfect for sensitive, acne-prone skin needing gentle protection."
    }
  });

  console.log("Seeded base line products!");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
