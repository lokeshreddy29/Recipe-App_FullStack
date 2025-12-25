import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import useRecipe from "../../../Hooks/useRecipe"
import RecipeCard from "./RecipeCard"

const MyRecipes = () => {
  const { data } = useRecipe()
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  let userRecipeCount = 0
  let communityRecipeCount = 0

  for (let i = 0; i < data?.length; i++) {
    if (data[i].userRecipeBool) {
      userRecipeCount = userRecipeCount + 1
    } else {
      communityRecipeCount = communityRecipeCount + 1
    }
  }

  return (
    <div className="mt-30 text-black m-5">
      {data?.length === 0 ? (
        <div className="text-4xl">You have no recipes</div>
      ) : (
        <div>
          <div className="bg-autumn-leaves-1 rounded-xl p-10 my-5">
            <div className="flex">
              <h1 className="text-3xl mb-10">Your Recipes</h1>
              <div>
                <button onClick={() => navigate('/')} 
                className="bg-white rounded-full p-2 ml-5 cursor-pointer transition duration-150 
                ease-in-out hover:bg-autumn-leaves-2 hover:text-white">Create more +</button>
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
          <div className="bg-autumn-leaves-1 rounded-xl p-10 my-5">
            <h1 className="text-3xl mb-10">Community Recipes</h1>
            <div className="flex flex-wrap space-x-10">
              {communityRecipeCount ? (
                data?.map((item, i) =>
                  !item.userRecipeBool ? (
                    <div key={i}>
                      <RecipeCard meal={item} />
                    </div>
                  ) : null
                )
              ) : (
                <h1 className="ml-5">
                  You haven't saved any community recipes. Browse and save
                  recipes to show them here
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyRecipes
