-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "skinTypes" TEXT[],
    "concerns" TEXT[],
    "acneTypes" TEXT[],
    "ingredients" TEXT[],
    "productType" TEXT NOT NULL,
    "imageUrl" TEXT,
    "purchaseLink" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
