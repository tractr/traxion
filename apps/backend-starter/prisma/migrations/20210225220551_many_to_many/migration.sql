-- CreateTable
CREATE TABLE "Right" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RightsOnRole" (
    "roleId" TEXT NOT NULL,
    "rightId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("roleId","rightId")
);

-- AddForeignKey
ALTER TABLE "RightsOnRole" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RightsOnRole" ADD FOREIGN KEY ("rightId") REFERENCES "Right"("id") ON DELETE CASCADE ON UPDATE CASCADE;
