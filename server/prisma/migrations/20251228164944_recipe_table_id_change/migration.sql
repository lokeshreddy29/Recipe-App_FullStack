/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");
