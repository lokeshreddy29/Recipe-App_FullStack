import { useQuery } from "@tanstack/react-query"

const useSearchMealApi = (searchQuery) => {
    const time = Date.now()
    return useQuery({
        queryKey:['Search_bar_recipe_find', searchQuery],
        queryFn: async () => {
            const searchResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
            const searchResponseJson = await searchResponse.json()
            return searchResponseJson
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}

export default useSearchMealApi