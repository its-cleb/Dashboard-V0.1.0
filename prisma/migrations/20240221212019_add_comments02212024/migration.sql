/*
  Warnings:

  - You are about to drop the column `plantId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_plantId_fkey";

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "manager" VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plantId";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "message" VARCHAR(999) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "madedById" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_madedById_fkey" FOREIGN KEY ("madedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
