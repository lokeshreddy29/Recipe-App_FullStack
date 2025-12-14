import { Route, Routes } from "react-router"
import Navigation from "./components/Navigation"
import LoginPage from "./components/LoginPage"
import Home from "./components/HomePage"

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </div>
  )
}

export default App
