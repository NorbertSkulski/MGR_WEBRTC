/*
  Warnings:

  - The `permissions` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('READ', 'CREATE', 'DELETE', 'UPDATE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions",
ADD COLUMN     "permissions" "Permission"[];

-- CreateIndex
CREATE UNIQUE INDEX "User_permissions_key" ON "User"("permissions");
