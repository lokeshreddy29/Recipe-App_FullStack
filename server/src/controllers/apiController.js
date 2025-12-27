import apiServices from "../services/apiServices.js"

const getUserRecipes = async (req, res) => {
    const userIDFromToken = await req.userID
    const apiServiceResponse = await apiServices.getUserRecipes( userIDFromToken )
    res.json(apiServiceResponse)
}

const saveCommunityRecipe = async (req, res) => {

    const userIDFromToken = await req.userID
    const { mealId, mealName } = await req.body
    console.log(req.body)
    const idMeal = mealId
    const strMeal = mealName
    console.log(userIDFromToken)
    const saveCommunityRecipeApiResponse = await apiServices.saveCommunityRecipe({ userIDFromToken, mealId, mealName })
    console.log(saveCommunityRecipeApiResponse)
}

export default { getUserRecipes, saveCommunityRecipe }