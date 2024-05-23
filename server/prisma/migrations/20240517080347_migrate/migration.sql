/*
  Warnings:

  - The values [CONNECTED,HIDE,DISCONNECTED,QUIET] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('ONLINE', 'OFFLINE');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ONLINE';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ONLINE';

-- CreateTable
CREATE TABLE "UsersToUsers" (
    "userUuid" TEXT NOT NULL,
    "friendUuid" TEXT NOT NULL,

    CONSTRAINT "UsersToUsers_pkey" PRIMARY KEY ("userUuid","friendUuid")
);

-- AddForeignKey
ALTER TABLE "UsersToUsers" ADD CONSTRAINT "UsersToUsers_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToUsers" ADD CONSTRAINT "UsersToUsers_friendUuid_fkey" FOREIGN KEY ("friendUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
