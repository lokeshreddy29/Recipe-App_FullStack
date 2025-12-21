-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL,
    "recipeName" TEXT NOT NULL,
    "recipeIngredients" TEXT NOT NULL,
    "recipeMeasurements" TEXT NOT NULL,
    "recipeInstructions" TEXT NOT NULL,
    "recipeImage" TEXT,
    "recipeCategory" TEXT,
    "userRecipeBool" BOOLEAN NOT NULL DEFAULT false,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
