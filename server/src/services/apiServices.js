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

        const findUser = await prisma.user.findUnique({
            where: {
                id: userIDFromToken
            }
        })
        if(!findUser) return({status: 404, message: 'User not found'})

        const mealIdInt = parseInt(mealId)
        const recipeSave = await prisma.recipe.create({
            data: {
                idMeal: mealIdInt,
                strMeal: mealName,
                userID: userIDFromToken,
                userRecipeBool: false,
            }
        })
        return recipeSave

    } catch(err) {

        return err

    }

}

export default { getUserRecipes, saveCommunityRecipe }