import { useEffect } from "react"
import { useLocation, useParams } from "react-router"

const RecipeDetails = () => {
  const location = useLocation()
  const params = useParams()
  const meal = location.state?.meal
  const mealIdFromUrl = params.mealid
  const xCoord = 0
  const yCoord = 0

  useEffect(() => {
    window.scrollTo(xCoord, yCoord)
  }, [])

  const iList = []
  for (let i = 1; i <= 20; i++) {
    const iKey = "strIngredient" + i
    const mKey = "strMeasure" + i
    if (meal[iKey]) iList.push(meal[iKey] + "  -  " + meal[mKey])
  }

  const instructionList = []
  instructionList.push(meal.strInstructions.split("\r\n"))

  return (
    <div className="mt-30 mb-10 text-autumn-leaves-4">
      {/* {console.log(instructionList[0])} */}
      <div className="flex flex-col justify-center items-center h-40 bg-autumn-leaves-1 rounded-2xl my-5 mx-20">
        <h1 className="text-lg">
          If you like this recipe you can save it. You can find saved recipes
          under the community recipes section
        </h1>
        <button
          className="h-15 p-3 mt-5 bg-white rounded-full cursor-pointer text-xl
        transition duration-200 ease-in-out hover:bg-autumn-leaves-3 hover:text-white"
        >
          Save this Recipe
        </button>
      </div>
      <div className="flex min-h-120 mx-20 bg-autumn-leaves-1 rounded-2xl">
        <div className="max-h-80 w-2/5 m-5 px-20 space-y-10">
          <div className="flex">
            <div className="text-3xl motion-preset-oscillate">😋</div>
            <h1 className="text-2xl">{meal.strMeal}</h1>
          </div>
          <img
            src={meal.strMealThumb}
            alt=""
            className="h-full shadow-lg rounded-xl"
          />
        </div>
        <div className="m-5 w-1/5">
          <h1 className="text-2xl underline mb-2">Ingredients</h1>
          <ul className="list-disc ml-5">
            {iList?.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>
            })}
          </ul>
        </div>
        <div className="w-2/5 m-5 px-20 mb-10">
          <h1 className="text-2xl underline mb-2">Instructions</h1>
          {/* <p className="text-sm/5">{meal.strInstructions}</p> */}
          <ol className="list-decimal ml-10">
            {instructionList[0]?.map((instruction, index) => {
              return instruction !== "" && instruction !== "▢" ? (
                <li key={index} className="mt-2 text-sm/6">
                  {instruction}
                </li>
              ) : null
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails
