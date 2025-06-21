/*
  Warnings:

  - You are about to drop the `_MarketToVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MarketToVendor" DROP CONSTRAINT "_MarketToVendor_A_fkey";

-- DropForeignKey
ALTER TABLE "_MarketToVendor" DROP CONSTRAINT "_MarketToVendor_B_fkey";

-- DropTable
DROP TABLE "_MarketToVendor";

-- CreateTable
CREATE TABLE "market_vendors" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "market_vendors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_vendors_marketId_vendorId_key" ON "market_vendors"("marketId", "vendorId");

-- AddForeignKey
ALTER TABLE "market_vendors" ADD CONSTRAINT "market_vendors_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_vendors" ADD CONSTRAINT "market_vendors_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
