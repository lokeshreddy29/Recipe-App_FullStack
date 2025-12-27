-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "recipeIngredients" DROP NOT NULL,
ALTER COLUMN "recipeMeasurements" DROP NOT NULL,
ALTER COLUMN "strInstructions" DROP NOT NULL;
