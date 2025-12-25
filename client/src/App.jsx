import { Route, Routes, useLocation } from "react-router"
import { decodeJwt } from 'jose'
import { useSelector, useDispatch } from "react-redux"
import { clearAccessInRedux } from "./Redux/Slices/authSlice"
import { useState } from "react"
import Navigation from "./components/Un-authorized/Navigation"
import ANavigation from "./components/Authorized/ANavigation"
import LoginPage from "./components/Un-authorized/LoginPage"
import Landing from "./components/Un-authorized/LandingPage"
import SignUp from "./components/Un-authorized/SignupPage"
import Dashboard from "./components/Authorized/Dashboard"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import Home from "./components/Authorized/HomePage"
import MyRecipes from "./components/Authorized/RecipeComponents/MyRecipes"
import RecipeDetails from "./components/Authorized/RecipeComponents/RecipeDetails"
import RecipeSearchResults from "./components/Authorized/RecipeComponents/RecipeSearchResults"


function App() {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [searchTriggered, setsearchTriggered] = useState(true)

  // handling global logout
  if(authState.userDets) {
    const jwtClaims = decodeJwt(authState.userDets?.AccessToken)
    const currentTimeInSeconds = Date.now() / 1000

    console.log(currentTimeInSeconds)
    console.log(jwtClaims.exp)

    if(currentTimeInSeconds === jwtClaims.exp || currentTimeInSeconds > jwtClaims.exp) {
      dispatch(clearAccessInRedux())
    }
  }
  
  return (
    <div className={`min-h-screen ${isAuthRoute ? 'bg-autumn-leaves-1' : 'bg-white'}`}>
      {!isAuthRoute && !authState.authDone ? (<Navigation className="scroll-auto" searchTriggered={searchTriggered} setsearchTriggered={setsearchTriggered} />) : null}
      {!isAuthRoute && authState.authDone ? (<ANavigation searchTriggered={searchTriggered} setsearchTriggered={setsearchTriggered} />) : null}
      {/* {console.log("rdx" + JSON.stringify(authState.userDets))} */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage /> } />
        <Route path='/signup' element={<SignUp /> } />
        <Route path='/recipedetails/:mealid' element={<RecipeDetails />} />
        <Route path='/recipesearchresults/:searchquery' element={<RecipeSearchResults />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/myrecipes' element={<MyRecipes /> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
