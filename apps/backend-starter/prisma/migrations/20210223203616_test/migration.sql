/*
  Warnings:

  - Added the required column `blogUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blogUrl" TEXT NOT NULL,
ADD COLUMN     "list" TEXT[];
