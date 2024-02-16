-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VIEW', 'WORKER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('UPCOMING', 'DELAYED', 'INPROGRESS', 'PROBLEM', 'COMPLETE');

-- CreateEnum
CREATE TYPE "BoatStatus" AS ENUM ('DELAYED', 'ONTRACK', 'PROBLEM', 'AHEAD');

-- CreateEnum
CREATE TYPE "BayStatus" AS ENUM ('EMPTY', 'OCCUPIED', 'CLEANUP');

-- CreateEnum
CREATE TYPE "ModelStatus" AS ENUM ('ACTIVE', 'RETIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT,
    "role" "Role" NOT NULL DEFAULT 'VIEW',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bay" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "BayStatus",
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Bay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boat" (
    "id" TEXT NOT NULL,
    "hull" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "status" "BoatStatus" NOT NULL DEFAULT 'ONTRACK',
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Boat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'UPCOMING',
    "category" TEXT NOT NULL,
    "boatId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "assignedToId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "ModelStatus" NOT NULL,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Boat_hull_key" ON "Boat"("hull");

-- AddForeignKey
ALTER TABLE "Bay" ADD CONSTRAINT "Bay_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_model_fkey" FOREIGN KEY ("model") REFERENCES "Models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
