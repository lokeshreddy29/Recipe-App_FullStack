import { Link, NavLink, useNavigate, useLocation } from "react-router"
import useSearchMealApi from "../../Hooks/useSearchMealApi"
import { useEffect, useState } from "react"

function Navigation({ searchTriggered, setsearchTriggered }) {
  const [searchQuery, setSearchQuery] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const isRecipePage = location.pathname === `/recipesearchresults/${searchQuery}`

  const { data, refetch, isFetched, isSuccess } = useSearchMealApi(searchQuery)

  const handleSearchSubmit = (e) => {
    const fData = {}
    e.preventDefault()
    const formData = new FormData(e.target)
    for (let [key, value] of formData.entries()) {
      fData[key] = value
    }
    setSearchQuery(fData.searchQuery)
    refetch()
    setsearchTriggered(true)
  }

  // console.log(data?.meals)

  useEffect(() => {
    if (!isFetched) return
    if (!data?.meals) return
    if (!searchTriggered) return

    navigate(`/recipesearchresults/${searchQuery}`, {
      state: {
        meals: data.meals,
      },
    })

    setsearchTriggered(false)
    
  }, [searchTriggered, isSuccess, data, searchQuery, navigate])

  return (
    <nav id="navbar">
      <div className={`h-16 ${isRecipePage ? "bg-white" : "bg-autumn-leaves-1"} flex justify-between items-center p-5 font-normal shadow-lg`}>
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl text-white font-medium cursor:pointer">
            Recipe HUB
          </h1>
        </Link>

        {/* Search Input field and search button */}
        <form className="flex space-x-5" onSubmit={handleSearchSubmit}>
          <input
            name="searchQuery"
            className=" h-10 w-100 bg-autumn-leaves-2 rounded-sm md:block hidden placeholder: p-4 
            transition suration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-white"
            placeholder="Search for recipes"
          />
          <button
            className="h-10 w-20 cursor-pointer text-white text-md rounded-md bg-autumn-leaves-3
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark"
            type="submit"
          >
            Search
          </button>
        </form>

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
          <Link to="/signup">
            <button
              className="h-10 w-20 cursor-pointer text-white text-md rounded-md bg-autumn-leaves-3
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark"
            >
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
