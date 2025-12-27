import { Link, NavLink, useNavigate, useLocation } from "react-router"
import useSearchMealApi from "../../Hooks/useSearchMealApi"
import { useEffect, useState } from "react"

function Navigation({ searchTriggered, setsearchTriggered }) {
  const [searchQuery, setSearchQuery] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const isRecipePage =
    location.pathname === `/recipesearchresults/${searchQuery}`

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

    let previousScrollPosition = 0
    let currentScrollPosition = 0

    window.addEventListener("scroll", function (e) {
      // Get the new Value
      currentScrollPosition = window.pageYOffset

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false)
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true)
      }

      // Update the previous value
      previousScrollPosition = currentScrollPosition
    })

    setsearchTriggered(false)
  }, [searchTriggered, isSuccess, data, searchQuery, navigate])

  return (
    <nav id="navbar">
      <div
        className={`h-16 ${
          isRecipePage ? "bg-white" : "bg-autumn-leaves-1"
        } flex justify-between items-center p-5 font-normal shadow-lg`}
      >
        {/* Logo */}
        <Link to="/">
          <h1
            className={`text-3xl font-medium cursor:pointer
            ${isRecipePage ? "text-autumn-leaves-4" : "text-white"}`}
          >
            Recipe HUB
          </h1>
        </Link>

        {/* Search Input field and search button */}
        <form onSubmit={handleSearchSubmit}>
          <div className="flex justify-between items-center h-10 w-100 bg-autumn-leaves-2 rounded-full">
            <div className="placeholder: ml-5 md:block hidden">
              <input
                name="searchQuery"
                placeholder="Search for recipes"
                className="outline-none"
                required
              />
            </div>
            <div
              className="bg-autumn-leaves-3 rounded-r-full h-full transition duration-100 ease-in
            hover:bg-autumn-leaves-4"
            >
              <button type="submit" className=" cursor-pointer">
                <svg
                  className="fill-autumn-leaves-1 scale-60 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="40px"
                >
                  <path
                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 
                36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 
                38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 
                33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* div for holding sign-in and sin-up buttons */}
        <div className="flex gap-x-10">
          <Link to="/login">
            <button
              className={`h-10 w-20 cursor-pointer  text-md rounded-md transition duration-300 ease-in-out 
              ${
                isRecipePage
                  ? "text-autumn-leaves-4 hover:bg-autumn-leaves-1"
                  : "text-white outline-1 outline-white hover:outline-autumn-compliment-dark"
              }`}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={`h-10 w-20 cursor-pointer text-md rounded-md transition duration-300 ease-in-out
              ${
                isRecipePage
                  ? "text-autumn-leaves-4 bg-white hover:bg-autumn-leaves-1"
                  : "text-white bg-autumn-leaves-3 hover:bg-white hover:text-autumn-compliment-dark"
              }`}
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
