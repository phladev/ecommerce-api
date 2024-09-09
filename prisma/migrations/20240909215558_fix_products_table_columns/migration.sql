/*
  Warnings:

  - You are about to drop the column `Description` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "Description",
DROP COLUMN "productsId",
ADD COLUMN     "description" TEXT NOT NULL;
