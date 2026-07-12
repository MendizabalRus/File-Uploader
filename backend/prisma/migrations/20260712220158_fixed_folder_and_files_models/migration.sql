/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `Folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "isFavorite";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "isFavorite";
