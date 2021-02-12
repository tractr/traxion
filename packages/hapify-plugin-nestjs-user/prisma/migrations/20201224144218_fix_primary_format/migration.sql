/*
  Warnings:

  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The migration will change the primary key for the `UserProfile` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `UserProfile` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The migration will change the primary key for the `UserRight` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserRight` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT,
    "website" TEXT,
    "age" INTEGER,
    "userId" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserProfile" ("id", "phone", "website", "age", "userId") SELECT "id", "phone", "website", "age", "userId" FROM "UserProfile";
DROP TABLE "UserProfile";
ALTER TABLE "new_UserProfile" RENAME TO "UserProfile";
CREATE UNIQUE INDEX "UserProfile.phone_unique" ON "UserProfile"("phone");
CREATE TABLE "new_UserRight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "right" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_UserRight" ("id", "right", "description") SELECT "id", "right", "description" FROM "UserRight";
DROP TABLE "UserRight";
ALTER TABLE "new_UserRight" RENAME TO "UserRight";
CREATE UNIQUE INDEX "UserRight.description_unique" ON "UserRight"("description");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
