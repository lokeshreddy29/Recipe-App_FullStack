import { useQuery } from "@tanstack/react-query"

function useMealApiRecipe() {
  return useQuery({
    queryKey: ["Recipes_in_browse_new"],
    queryFn: async () => {
      try {
        const mealDbApiResponses = Array.from({ length: 3 }, mealDbApiResponse)
        return Promise.all(mealDbApiResponses)
      } catch (error) {
        return error
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
}

const mealDbApiResponse = async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  const data = await res.json()
  return data
}

export default useMealApiRecipe
