import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";



function ProtectedRoute({ children }) {
    const { user,loading } = useContext(AuthContext);
{/*We need loading state because when ever we go to cart page first the useeffect needs time to check if user in localstorage then it shows null soloading state gives useeffect its time to load if user is already present in localstorage */}
    if (loading) {
    return <p>Loading...</p>;
}

    if(!user){
        return <Navigate to="/login"  />;
    }

    return children;
}

export default ProtectedRoute;

