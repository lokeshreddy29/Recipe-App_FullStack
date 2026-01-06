import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import "../Authorized/RecipeComponents/RecipeCard"
import RecipeCard from "../Authorized/RecipeComponents/RecipeCard"
import useMealApiRecipe from "../../Hooks/useMealApiRecipe"

function Home() {
  const authState = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const { isLoading, refetch, data, error, isError } = useMealApiRecipe()

  const imgUrl =
    "https://cdn.dribbble.com/userupload/32470901/file/original-525bdd9c826f3fc8f85c5a40aeb2cc6c.jpg?resize=1024x769&vertical=center"

  return (
    <div id="page" className="w-full h-screen pt-16 scale-100">
      <div id="rectangle" className="flex items-center h-2/3 bg-white mx-30">
        <div id="hero-text" className="w-full md:w-1/2 flex justify-center">
          <div className="flex flex-col items-center md:block">
            {/* we are checking if the user is logged in to decide what hero text to display */}
            {authState.authDone ? (
              <h1 className="text-5xl">
                Welcome back, {authState.userDets?.UserName}
              </h1>
            ) : (
              <h1 className="text-5xl ">Welcome to Recipe HUB</h1>
            )}
            <p className="text-3xl text-autumn-leaves-1 italic ml-2">
              Ready to share your recipes with the world ?
            </p>

            {/* we are checking if the user is logged in to decide what CTA to display - to login or to create a new recipe */}
            {authState.authDone ? (
              <button
                className="motion-preset-oscillate mt-10 p-4 rounded-xl ml-2 text-3xl text-white cursor-pointer bg-autumn-leaves-1 outline-0
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark hover:ring ring-autumn-compliment-dark"
              >
                Cook
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="motion-preset-oscillate mt-10 p-5 rounded-xl ml-2 text-2xl text-white cursor-pointer bg-autumn-leaves-1 outline-0
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark hover:ring ring-autumn-compliment-dark"
                >
                  Access your kitchen
                </button>
              </Link>
            )}
          </div>
        </div>
        <div id="hero-image" className="w-0 md:w-1/2 flex justify-center">
          <img
            className="hidden md:block w-140 ring-0 ring-autumn-leaves-1 rounded-xl"
            src={imgUrl}
            alt="Recipe Hub"
          />
        </div>
      </div>

      <div id="card-holder" className="bg-autumn-leaves-1 py-10 px-60">
        <div className="flex flex-col items-center">
          <h1 className="motion-preset-fade-lg text-autumn-leaves-3 text-6xl font-medium underline">
            Browse new recipes
          </h1>
          <h1 className="motion-preset-rebound-up text-lg transition-opacity ease-in duration-200 opacity-100 mt-2">
            click on know more on a recipe card to find the instructions,
            ingredients and, more
          </h1>
          <button onClick={() => authState.authDone ? refetch() : navigate('/login')} 
          className="bg-white rounded-2xl p-5 mt-5 text-xl cursor-pointer transition duration-150 
          ease-in-out hover:bg-autumn-leaves-2 hover:text-white">
            Find new recipes
          </button>
        </div>
        {/* Recips cards container */}
        {isLoading ? (
          <div>Loading.....</div>
        ) : (
          <div className="mt-20 flex justify-between flex-wrap space-y-20">
            {data?.map((item, index) => {
              return <div key={index} className="motion-preset-seesaw-sm motion-loop-[3] hover:motion-paused"><RecipeCard meal={item.meals[0]} /></div>
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
