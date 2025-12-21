import { Link, NavLink } from "react-router"
import { useDispatch } from "react-redux"
import { clearAccessInRedux } from "../../Redux/Slices/authSlice"

function ANavigation() {

  const dispatch = useDispatch()

  return (
    <nav id="navbar">
      <div className="h-16 bg-autumn-leaves-1 flex justify-between items-center p-5 font-ZalandoSansExpanded font-normal">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl text-white font-medium cursor:pointer">
            Recipe HUB
          </h1>
        </Link>

        {/* Search Input field */}
        <input
          className=" h-10 w-100 bg-autumn-leaves-2 rounded-sm md:block hidden placeholder: p-4 
            transition suration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Search for recipes"
        />

        {/* div for holding My recipes and logout buttons */}
        <div className="flex gap-x-10 mr-5">
          <Link to="/myrecipes">
            <button
              className="h-10 w-30 cursor-pointer text-white text-md rounded-md outline-1 outline-white
              transition duration-300 ease-in-out hover:outline-autumn-compliment-dark"
            >
              My Recipes
            </button>
          </Link>

          <button
            className="h-10 w-20 cursor-pointer text-white text-md rounded-md outline-1 outline-white
            transition duration-300 ease-in-out hover:outline-autumn-compliment-dark"
            onClick={() => dispatch(clearAccessInRedux())}
          >
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  )
}

export default ANavigation
