import { useMutation, useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

const useRecipeSave = () => {
  const authState = useSelector((state) => state.auth)

  return useMutation({
    mutationFn: async (mealInfo) => {
      const saveApiResponse = await fetch(
        `http://13.54.140.29/api/saveCommunityRecipe`,
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
        const err = await saveApiResponse.json()
        throw new Error(err.message)
      }

      return saveApiResponse.json()
    },
  })
}

export default useRecipeSave
