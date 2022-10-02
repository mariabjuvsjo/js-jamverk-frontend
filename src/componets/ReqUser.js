import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from '../hooks/useUser';

const ReqUser = () => {
    const { auth } = useUser()
    const location = useLocation()

    return (
        auth?.username
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )



}

export default ReqUser;