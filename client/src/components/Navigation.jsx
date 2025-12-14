import { Link, NavLink } from "react-router"
import "../styles/styles.css"

function Navigation() {
  return (
    <nav>
      <div className="h-16 bg-autumn-leaves-1 flex justify-between items-center p-5 font-ZalandoSansExpanded font-normal">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-medium cursor:pointer">Recipe HUB</h1>
        </Link>

        {/* Search Input field */}
        <input
          className=" h-10 w-100 bg-autumn-leaves-2 rounded-sm md:block hidden placeholder: p-4 
            transition suration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Search for recipes"
        />

        {/* div for holding sign-in and sin-up buttons */}
        <div className="flex gap-x-10">
          <Link to="/login">
            <button
              className="h-10 w-20 cursor-pointer text-white text-md rounded-md outline-1 outline-white
              transition duration-300 ease-in-out hover:outline-autumn-compliment-dark"
            >
              Login
            </button>
          </Link>
          <button
            className="h-10 w-20 cursor-pointer text-white text-md rounded-md bg-autumn-leaves-3
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark"
          >
            Signup
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navigation
