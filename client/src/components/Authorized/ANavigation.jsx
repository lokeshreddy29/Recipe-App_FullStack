import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate, useLocation } from "react-router"
import { useDispatch } from "react-redux"
import { clearAccessInRedux } from "../../Redux/Slices/authSlice"
import useSearchMealApi from "../../Hooks/useSearchMealApi"

function ANavigation({ searchTriggered, setsearchTriggered }) {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState({})
  const [show, setShow] = useState(true)
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
        searchQuery: searchQuery,
      },
    })

    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener('scroll', function (e) {

      // Get the new Value
      currentScrollPosition = window.pageYOffset;

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }

      // Update the previous value
      previousScrollPosition = currentScrollPosition;
    });

    setsearchTriggered(false)
  }, [searchTriggered, isSuccess, data, searchQuery, navigate])

  return (
    <nav id="navbar">
      <div className={`h-16 ${isRecipePage ? "bg-white" : "bg-autumn-leaves-1"} flex justify-between items-center p-5 font-normal
      active ${!show && "transition duration-200 ease-in-out hidden"}`}>
        {/* Logo */}
        <Link to="/">
          <h1 className={`text-3xl ${isRecipePage? "text-autumn-leaves-4": "text-white"} font-medium cursor:pointer`}>
            Recipe HUB
          </h1>
        </Link>

        {/* Search Input field */}
        <form className="flex space-x-5" onSubmit={handleSearchSubmit}>
          <input
            name="searchQuery"
            className={`h-10 w-100 rounded-sm md:block hidden placeholder: p-4 
            transition suration-300 ease-in-out focus:outline-none focus:ring-1
            ${isRecipePage? "bg-autumn-leaves-1 focus:ring-autumn-compliment-dark" : "bg-autumn-leaves-2 focus:ring-white" }`}
            placeholder="Search for recipes"
          />
          <button
            className={`h-10 w-20 cursor-pointer text-md rounded-md bg-autumn-leaves-3
            transition duration-300 ease-in-out 
            ${isRecipePage? "text-autumn-leaves-4 bg-white hover:bg-autumn-leaves-1" 
              : "text-white hover:bg-white hover:text-autumn-compliment-dark"}`}
            type="submit"
          >
            Search
          </button>
        </form>

        {/* div for holding My recipes and logout buttons */}
        <div className="flex gap-x-10 mr-5">
          <Link to="/myrecipes">
            <button
              className={`h-10 w-30 cursor-pointer text-md rounded-md
              transition duration-300 ease-in-out
              ${isRecipePage? "text-autumn-leaves-4 hover:outline-autumn-leaves-1 hover:bg-autumn-leaves-1" 
                : "text-white outline-1 outline-white hover:outline-autumn-compliment-dark"}`}
            >
              My Recipes 
            </button>
          </Link>

          <button
            className={`h-10 w-20 cursor-pointer text-md rounded-md 
              transition duration-300 ease-in-out
              ${isRecipePage? "text-autumn-leaves-4 hover:outline-autumn-leaves-1 hover:bg-autumn-leaves-1" 
                : "text-white outline-1 outline-white hover:outline-autumn-compliment-dark"}`}
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
