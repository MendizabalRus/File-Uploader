-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
