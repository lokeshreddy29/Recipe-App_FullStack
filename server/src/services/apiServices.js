import prisma from "../prismaClient.js"

const getUserRecipes = async (userIDFromToken) => {

    try {
        const recipes = await prisma.recipe.findMany({
            where: {
                userID: userIDFromToken,
            }
        })

        return recipes
    } 
    catch (err) {
        return err
    }

}

const saveCommunityRecipe = async ({ userIDFromToken, mealId, mealName }) => {

    try {

        // first find if the user id exists in db
        const findUser = await prisma.user.findUnique({
            where: {
                id: userIDFromToken
            }
        })
        if(!findUser) return({ status: 404, message: 'User not found' })
        //

        // next check if the user already saved the recipe
        const mealIdInt = parseInt(mealId)
        const findIfRecipeExists = await prisma.recipe.findUnique({
            where: {
                idMeal: mealIdInt,
                userID: userIDFromToken
            }
        })
        if(findIfRecipeExists) return ({ status: 409, message: 'Recipe already saved' })
        //

        
        // if not then save the recipe
        const recipeSave = await prisma.recipe.create({
            data: {
                idMeal: mealIdInt,
                strMeal: mealName,
                userID: userIDFromToken,
                userRecipeBool: false,
            }
        })
        return ({ status: 200, message: 'Recipe saved' })
        //

    } catch(err) {

        return err

    }

}

export default { getUserRecipes, saveCommunityRecipe }