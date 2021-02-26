/*
  Warnings:

  - You are about to drop the `RightsOnRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RightsOnRole" DROP CONSTRAINT "RightsOnRole_rightId_fkey";

-- DropForeignKey
ALTER TABLE "RightsOnRole" DROP CONSTRAINT "RightsOnRole_roleId_fkey";

-- AlterTable
ALTER TABLE "Right" ADD COLUMN     "rightId" TEXT;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "roleId" TEXT;

-- DropTable
DROP TABLE "RightsOnRole";

-- AddForeignKey
ALTER TABLE "Right" ADD FOREIGN KEY ("rightId") REFERENCES "Right"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
