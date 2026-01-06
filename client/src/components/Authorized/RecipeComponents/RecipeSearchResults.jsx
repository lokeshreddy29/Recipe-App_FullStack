import { useLocation } from "react-router"
import { useEffect } from "react"
import RecipeCard from "./RecipeCard"

const RecipeSearchResults = () => {
    const location = useLocation()
    const searchMeals = location.state?.meals
    const searchQuery = location.state?.searchQuery

    return (
        <div className="pt-20 bg-white">
            <div className=" text-black bg-autumn-leaves-1 m-10 rounded-2xl flex flex-col">
                <div className="h-20 flex justify-center items-center bg-autumn-leaves-2 rounded-t-2xl">
                    <h1 className="text-3xl text-autumn-leaves-4">{`Recipe search results for ${searchQuery}`}</h1>
                </div>
                <div className="flex flex-wrap justify-center pb-10 mx-40 mt-10">
                    {console.log(searchMeals)}
                    {!searchMeals ? (<div>No meals found</div>) :
                    searchMeals.map((meal, index) => {return <div key={index} className="scale-90"><RecipeCard meal={meal} /></div>})
                    }
                </div>
            </div>
        </div>
    )
}

export default RecipeSearchResults