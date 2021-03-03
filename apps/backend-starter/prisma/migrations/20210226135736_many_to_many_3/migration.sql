/*
  Warnings:

  - You are about to drop the column `rightId` on the `Right` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Right" DROP CONSTRAINT "Right_rightId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_roleId_fkey";

-- AlterTable
ALTER TABLE "Right" DROP COLUMN "rightId";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "roleId";

-- CreateTable
CREATE TABLE "_RightToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RightToRole_AB_unique" ON "_RightToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_RightToRole_B_index" ON "_RightToRole"("B");

-- AddForeignKey
ALTER TABLE "_RightToRole" ADD FOREIGN KEY ("A") REFERENCES "Right"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RightToRole" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
