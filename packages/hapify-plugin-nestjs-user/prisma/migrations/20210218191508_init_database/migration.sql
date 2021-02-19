/*
  Warnings:

  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `UserProfile` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `website` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the `UserRight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "UserRight.description_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "banned" BOOLEAN NOT NULL,
    "lastConnectedAt" DATETIME
);
INSERT INTO "new_User" ("id", "name", "email", "password", "role", "banned", "lastConnectedAt") SELECT "id", "name", "email", "password", "role", "banned", "lastConnectedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE TABLE "new_UserProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT,
    "age" INTEGER,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserProfile" ("id", "phone", "age", "userId") SELECT "id", "phone", "age", "userId" FROM "UserProfile";
DROP TABLE "UserProfile";
ALTER TABLE "new_UserProfile" RENAME TO "UserProfile";
CREATE UNIQUE INDEX "UserProfile.phone_unique" ON "UserProfile"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserRight";
PRAGMA foreign_keys=on;
