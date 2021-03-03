/*
  Warnings:

  - Added the required column `rights` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "rights" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Right" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
