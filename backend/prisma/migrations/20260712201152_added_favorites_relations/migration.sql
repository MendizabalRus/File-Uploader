-- CreateTable
CREATE TABLE "FolderFavorites" (
    "userId" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "FolderFavorites_pkey" PRIMARY KEY ("userId","folderId")
);

-- CreateTable
CREATE TABLE "FileFavorites" (
    "userId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "FileFavorites_pkey" PRIMARY KEY ("userId","fileId")
);

-- AddForeignKey
ALTER TABLE "FolderFavorites" ADD CONSTRAINT "FolderFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderFavorites" ADD CONSTRAINT "FolderFavorites_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFavorites" ADD CONSTRAINT "FileFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFavorites" ADD CONSTRAINT "FileFavorites_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
