import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

function useRecipe() {
  const authState = useSelector((state) => state.auth)

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user-recipes", authState.userDets?.UserID],
    queryFn: async () => {
      const getUserRecipesResponse = await fetch(
        `https://api.recipeappbyloki.in/api/userRecipes`,
        {
          headers: {
            Authorization: `Bearer ${authState.userDets?.AccessToken}`,
          },
        }
      )

      if (!getUserRecipesResponse.ok) {
        const err = await getUserRecipesResponse.json()
        throw new Error(err.message)
      }

      const userRecipes = await getUserRecipesResponse.json()

      return userRecipes
    },
    enabled: !!authState.userDets.AccessToken,
    retry: false,
  })

  return { isLoading, isError, error, data }
}

export default useRecipe
