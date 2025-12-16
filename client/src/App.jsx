import { Route, Routes, useLocation } from "react-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Navigation from "./components/Navigation"
import LoginPage from "./components/LoginPage"
import Home from "./components/HomePage"
import SignUp from "./components/SignupPage"

const queryClient = new QueryClient()

function App() {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className={`min-h-screen ${isAuthRoute ? 'bg-autumn-leaves-1' : 'bg-white'}`}>
      {!isAuthRoute? (<Navigation />) : null}
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<QueryClientProvider client={queryClient}> <SignUp /> </QueryClientProvider>}/>
      </Routes>
    </div>
  )
}

export default App
