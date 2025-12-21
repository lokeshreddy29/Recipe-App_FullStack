import { useSelector } from "react-redux"
import { Link } from "react-router"

function Home() {
    const authState = useSelector(state => state.auth)
    
  const imgUrl =
    "https://cdn.dribbble.com/userupload/32470901/file/original-525bdd9c826f3fc8f85c5a40aeb2cc6c.jpg?resize=1024x769&vertical=center"

  return (
    <div id="page" className="w-full h-screen pt-16">
      <div
        id="rectangle"
        className="flex items-center h-1/2 bg-autumn-leaves-light-1"
      >
        <div id="hero-text" className="w-full md:w-1/2 flex justify-center">
          <div className="flex flex-col items-center md:block">
            <h1 className="text-4xl md:text-5xl">Welcome back, {authState.userDets?.UserName}</h1>
            <p className="text-xl ml-2">
              Ready to share your recipes with the world ?
            </p>
            <button
              className="mt-10 p-2 rounded-xl ml-2 text-2xl text-white cursor-pointer bg-autumn-leaves-1 outline-0
            transition duration-300 ease-in-out hover:bg-white hover:text-autumn-compliment-dark hover:ring ring-autumn-compliment-dark"
            >
              Cook
            </button>
          </div>
        </div>
        <div id="hero-image" className="w-0 md:w-1/2 flex justify-center">
          <img
            className="hidden md:block w-120 ring-0 ring-autumn-leaves-1 rounded-xl"
            src={imgUrl}
            alt="Recipe Hub"
          />
        </div>
      </div>
      <Link to='/dashboard'>
        <button>go to dashboard</button>
      </Link>
    </div>
  )
}

export default Home
