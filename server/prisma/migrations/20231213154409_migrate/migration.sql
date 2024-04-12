/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[permissions]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_B_fkey";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "_PermissionToUser";

-- CreateIndex
CREATE UNIQUE INDEX "User_permissions_key" ON "User"("permissions");
