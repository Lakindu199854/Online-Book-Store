import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ()=>{
    //When there is a token in the session storage there is a logged in user
    const token=sessionStorage.getItem('token');

    if(!token){
        return(
            <Navigate to={'/login'} replace/>
            //If the user is not authenticated send him to teh login page
        )
    }
    //if the user is authenticated show all the child components in the protected routes
    return <Outlet/>
}

export default ProtectedRoute;