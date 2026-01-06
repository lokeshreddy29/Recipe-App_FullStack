import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

const RecipeCard = ({ meal }) => {
    const recipeType = 'veg'
    const navigate = useNavigate()
    const authState = useSelector(state => state.auth)

    const handleClick = () => {
        navigate(`/recipedetails/${meal.idMeal}`, {
            state: {
                meal: meal
            }
        })
    }

    return (
        <div id="parent-container" className="flex flex-col w-100 shadow-lg bg-white rounded-xl">
            <div id="image-container" className="overflow-hidden h-40 flex justify-center mt-4">
                <img src={meal.strMealThumb} className="w-10/11 h-full object-cover object-center rounded-t-md"/>
            </div>
            <div id="text-container" className="w-full h-60 rounded-b-xl flex flex-col space-y-5">
                <div id="title-type-container" className="h-10 flex justify-between px-4 pt-3 overflow-hidden">
                    <h1 className="w-80 text-xl text-autumn-leaves-2 font-medium overflow-hidden">{meal.strMeal}</h1>
                    <ul className="list-disc">
                        <li className={`text-3xl ${meal.recipeCategory === 'veg' || !meal.recipeCategory ? "text-green-500" : "text-red-600"}`}> </li>
                    </ul>
                </div>
                <div id="details-container" className="flex flex-col text-[13px] px-4 items-center">
                    <p className="mt-2">Prep & cook time - 30 mins | serves - 2</p>
                    <p className="mt-2">Main ingredients - pasta, mushrooms, shallets</p>
                    <p className="mt-2">Difficulty -</p>
                </div>
                <div id="button-fav-container" className="p-4 flex justify-center">
                    <button onClick={() => authState.authDone ? handleClick() : navigate('/login')} className="bg-autumn-leaves-1 w-30 h-10 rounded-md text-white italic cursor-pointer
                    transform duration-150 ease-in hover:bg-white hover:text-black hover:ring-1 ring-autumn-compliment-dark">Know more</button>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard