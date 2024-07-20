/*
  Warnings:

  - You are about to drop the column `productsId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `User` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productsId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productsId";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
