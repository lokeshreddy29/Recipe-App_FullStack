import { Outlet, Navigate } from "react-router"
import { useSelector } from "react-redux"


export default function ProtectedRoutes() {
    const authState = useSelector((state) => state.auth)
    return authState.authDone === true ? <Outlet /> : <Navigate to='/login'/>
}