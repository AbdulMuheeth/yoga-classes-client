import { Navigate } from "react-router-dom";
import ProfileBody from "../Components/ProfileBody";
import './UserProfile.css';

const UserProfile = () => {
    return(
        <div className="container">
            {(localStorage.getItem('loggedin')&&localStorage.getItem('id'))? <ProfileBody/> : <Navigate to="/login"/>}
        </div>
    )
}

export default UserProfile;