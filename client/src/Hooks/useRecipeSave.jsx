import { useMutation, useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const useRecipeSave = () => {
  const authState = useSelector((state) => state.auth)

  return useMutation({
    mutationFn: async (mealInfo) => {
      const saveApiResponse = await fetch(
        "http://localhost:3000/api/saveCommunityRecipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.userDets?.AccessToken}`,
          },
          body: JSON.stringify(mealInfo),
        }
      )

      if(!saveApiResponse.ok) {
        throw new Error("Failed to save recipe")
      }

      return saveApiResponse.json()
    },
  })
}

export default useRecipeSave
