import { Route, Routes, useLocation } from "react-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { decodeJwt } from 'jose'
import { useSelector, useDispatch } from "react-redux"
import { clearAccessInRedux } from "./Redux/Slices/authSlice"
import Navigation from "./components/Un-authorized/Navigation"
import ANavigation from "./components/Authorized/ANavigation"
import LoginPage from "./components/Un-authorized/LoginPage"
import Landing from "./components/Un-authorized/LandingPage"
import SignUp from "./components/Un-authorized/SignupPage"
import Dashboard from "./components/Authorized/Dashboard"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import Home from "./components/Authorized/HomePage"
import MyRecipes from "./components/Authorized/RecipeComponents/MyRecipes"

const queryClient = new QueryClient()

function App() {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

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
      {!isAuthRoute && !authState.authDone ? (<Navigation />) : null}
      {!isAuthRoute && authState.authDone ? (<QueryClientProvider client={queryClient}> <ANavigation /> </QueryClientProvider>) : null}
      {/* {console.log("rdx" + JSON.stringify(authState.userDets))} */}
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/login' element={<QueryClientProvider client={queryClient}> <LoginPage /> </QueryClientProvider>} />
        <Route path='/signup' element={<QueryClientProvider client={queryClient}> <SignUp /> </QueryClientProvider>} />
        <Route path='/home' element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/myrecipes' element={<QueryClientProvider client={queryClient}> <MyRecipes /> </QueryClientProvider>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
