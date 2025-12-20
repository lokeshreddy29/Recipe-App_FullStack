import { Outlet, Navigate } from "react-router"


export default function ProtectedRoutes({ access }) {
    return access != null ? <Outlet /> : <Navigate to='/login'/>
}