/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOnPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnPermission" DROP CONSTRAINT "UserOnPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnPermission" DROP CONSTRAINT "UserOnPermission_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" TEXT[];

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "UserOnPermission";
