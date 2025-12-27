import { useQueries, useQuery } from "@tanstack/react-query"

const useGetCommunityRecipeDetails = (mealIds = []) => {
    return useQueries({
        queries: mealIds?.map(mealId => ({
            queryKey: ['communityRecipe', mealId],
            queryFn: () => getCommunityRecipeDetailsById(mealId),
            enabled: !!mealId,
            refetchOnMount: false,
            refetchOnWindowFocus: false,  
        })),
    })
}

const getCommunityRecipeDetailsById = async (mealId) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    const resJson = await res.json()
    return resJson
}

export default useGetCommunityRecipeDetails
