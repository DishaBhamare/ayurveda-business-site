import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProfileMenu() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        
    );
}