import apiServices from "../services/apiServices.js"

const getUserRecipes = async (req, res) => {
    const userIDFromToken = await req.userID
    const apiServiceResponse = await apiServices.getUserRecipes( userIDFromToken )
    res.json(apiServiceResponse)
}

const saveCommunityRecipe = async (req, res) => {

    const userIDFromToken = await req.userID
    const { mealId, mealName } = await req.body
    const saveCommunityRecipeApiResponse = await apiServices.saveCommunityRecipe({ userIDFromToken, mealId, mealName })
    console.log(saveCommunityRecipeApiResponse)

    // if the user already saved the particular meal
    if(saveCommunityRecipeApiResponse.status === 409)
        res.status(saveCommunityRecipeApiResponse.status).json({ status: 409, message: saveCommunityRecipeApiResponse.message })
    // if the recipe save is successful
    if(saveCommunityRecipeApiResponse.status === 200)
        res.status(saveCommunityRecipeApiResponse.status)
}

export default { getUserRecipes, saveCommunityRecipe }