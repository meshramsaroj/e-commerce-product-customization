import { useQuery } from "@tanstack/react-query";
import { getLoginUserDetails, logoutUser } from "../API_Service/authAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify"

const UserProfile = () => {
  const navigate = useNavigate()
  const { data: user } = useQuery({
    queryKey: ["user-details"],
    queryFn: getLoginUserDetails
  })

  const handleLogout = async () => {
    logoutUser().then(res => {
      toast(res.data.message)
      localStorage.removeItem("accessToken")
      navigate("/")
    }).catch(error => error)
  }

  console.log("user",user)


  return (
    user?.firstName ?
      <div className="dropdown dropdown-bottom">
        <div className="avatar avatar-placeholder" tabIndex={0} role="button">
          <FontAwesomeIcon size="2x" icon={faUserCircle} />
          <span className="text-sm">{user.firstName}</span>
        </div>
        <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={handleLogout}>Logout</a></li>
          <li><a>View Profile </a></li>
        </ul>
      </div>

      :
      <div className="flex-row">
        <NavLink to="/login" className="btn btn-link"> Login </NavLink>

        <NavLink to="/register" className="btn btn-primary"> Create Account</NavLink>
      </div>
  );
};

export default UserProfile;