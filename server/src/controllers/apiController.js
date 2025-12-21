import apiServices from "../services/apiServices.js"

const getUserRecipes = async (req, res) => {
    const userIDFromToken = await req.userID
    const apiServiceResponse = await apiServices.getUserRecipes( userIDFromToken )
    res.json(apiServiceResponse)
}

export default { getUserRecipes }