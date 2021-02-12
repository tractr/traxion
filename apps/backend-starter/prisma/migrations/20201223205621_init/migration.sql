/*
  Warnings:

  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banned` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "age" INTEGER,
    "userId" TEXT NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRight" (
    "id" TEXT NOT NULL,
    "right" TEXT NOT NULL,
    "description" TEXT,
    PRIMARY KEY ("id")
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL,
    "lastConnectedAt" DATETIME,
    PRIMARY KEY ("id")
);
INSERT INTO "new_User" ("id", "email", "name") SELECT "id", "email", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile.phone_unique" ON "UserProfile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserRight.description_unique" ON "UserRight"("description");
