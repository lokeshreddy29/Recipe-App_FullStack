/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `recipeImage` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `recipeInstructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `recipeName` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `idMeal` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strInstructions` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strMeal` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "id",
DROP COLUMN "recipeImage",
DROP COLUMN "recipeInstructions",
DROP COLUMN "recipeName",
ADD COLUMN     "idMeal" INTEGER NOT NULL,
ADD COLUMN     "strInstructions" TEXT NOT NULL,
ADD COLUMN     "strMeal" TEXT NOT NULL,
ADD COLUMN     "strMealThumb" TEXT,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("idMeal");
