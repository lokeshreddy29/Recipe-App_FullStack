import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import useRecipe from "../../../Hooks/useRecipe"
import useGetCommunityRecipeDetails from "../../../Hooks/useGetCommunityRecipeDetails"
import RecipeCard from "./RecipeCard"

const MyRecipes = () => {
  const authState = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // custom hooks
  const { data, isLoading } = useRecipe()
  console.log(data)
  //

  // logic to know the count of user vs community recipes
  const userRecipeCount = useMemo(() => {
    if (!data) return 0
    return data?.filter((r) => r.userRecipeBool).length
  }, [data])

  const communityRecipeCount = useMemo(() => {
    if (!data) return 0
    return data?.filter((r) => !r.userRecipeBool).length
  }, [data])
  //

  // logic to get meal id's of community recipes. 
  // We are first filtering all the meals that are not user's and then mapping over them to get their id's
  const communityRecipeIds = useMemo(() => {
    if (!data) return []

    return data
      .filter((recipe) => !recipe.userRecipeBool)
      .map((recipe) => recipe.idMeal)
  }, [data])
  //

  // custom hooks
  const queries = useGetCommunityRecipeDetails(communityRecipeIds)
  //

  // logic to handle Recipes data received from custom hook
  const recipesisLoading = queries.some((q) => q.isLoading)
  const recipesData = queries.map((q) => q.data).filter(Boolean)
  // console.log("recipesData" + recipesData[0]?.meals[0].strMeal)
  //

  return (
    <div className="mt-30 text-black m-5 mx-60">
      <div>
        <div
          id="user-recipes"
          className="bg-autumn-leaves-1 rounded-xl p-10 my-5"
        >
          <div className="flex">
            <h1 className="text-3xl mb-10 underline text-autumn-leaves-4">Your Recipes</h1>
            <div>
              <button
                onClick={() => navigate("/")}
                className="bg-white rounded-full p-2 ml-5 cursor-pointer transition duration-150 
                ease-in-out hover:bg-autumn-leaves-2 hover:text-white"
              >
                Create more +
              </button>
            </div>
          </div>
          <div className="flex flex-wrap space-x-10">
            {userRecipeCount ? (
              data?.map((item, i) =>
                item.userRecipeBool ? (
                  <div key={i} className="scale-100">
                    <RecipeCard meal={item} />
                  </div>
                ) : null
              )
            ) : (
              <h1 className="ml-5">No user recipes</h1>
            )}
          </div>
        </div>
        <div
          id="community-recipes"
          className="bg-autumn-leaves-1 rounded-xl p-10 my-5"
        >
          <h1 className="text-3xl mb-10 underline text-autumn-leaves-4">Community Recipes</h1>
          <div className="flex flex-wrap space-x-10 space-y-10 scale-100">
            {isLoading || recipesisLoading || !communityRecipeCount ? (
              "loading"
            ) : communityRecipeCount ? (
              recipesData?.map((item, i) =>
                !item.userRecipeBool ? (
                  <div key={i}>
                    <RecipeCard meal={item?.meals[0]} />
                  </div>
                ) : null
              )
            ) : (
              <h1 className="ml-5">
                You haven't saved any community recipes. Browse and save recipes
                to show them here
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRecipes
