import { Route, Routes, useLocation } from "react-router"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Navigation from "./components/Un-authorized/Navigation"
import LoginPage from "./components/Un-authorized/LoginPage"
import Landing from "./components/Un-authorized/LandingPage"
import SignUp from "./components/Un-authorized/SignupPage"
import Dashboard from "./components/Authorized/Dashboard"
import ProtectedRoutes from "./utils/ProtectedRoutes"

const queryClient = new QueryClient()

function App() {
  const [access, setAccess] = useState(null)
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className={`min-h-screen ${isAuthRoute ? 'bg-autumn-leaves-1' : 'bg-white'}`}>
      {!isAuthRoute? (<Navigation />) : null}
      <Routes>
        <Route index element={<Landing />} />
        <Route path='/login' element={<QueryClientProvider client={queryClient}> <LoginPage setAccess={setAccess}/> </QueryClientProvider>}/>
        <Route element={<ProtectedRoutes access={access} />}>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
        <Route path='/signup' element={<QueryClientProvider client={queryClient}> <SignUp /> </QueryClientProvider>}/>
      </Routes>
    </div>
  )
}

export default App
