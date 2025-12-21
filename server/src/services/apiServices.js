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

export default { getUserRecipes }