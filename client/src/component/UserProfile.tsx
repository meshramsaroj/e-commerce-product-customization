import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoginUserDetails, logoutUser } from "../API_Service/authAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify"
import { clearAuthState } from "../API_Service/axiosInstance";

const UserProfile = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = localStorage.getItem("accessToken")
  const { data: user } = useQuery({
    queryKey: ["user-details"],
    queryFn: getLoginUserDetails
  })

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      toast.success(response.message ?? "Logged out successfully")
    } catch (error) {
      toast.error("Unable to log out. Please try again.")
    } finally {
      clearAuthState()
      queryClient.clear()
      navigate("/login")
    }
  }


  const handleNavigate =() => {
    navigate("/admin")
  }

  return (
    token ?
      <div className="dropdown dropdown-end">
        <div className="avatar avatar-placeholder" tabIndex={0} role="button">
          <FontAwesomeIcon size="2x" icon={faUserCircle} />
          <span className="text-sm">{user?.firstName}</span>
        </div>
        <ul tabIndex={-1} className="dropdown-content text-primary-dark menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={handleNavigate}>Dashboard</a></li>

          <li><a onClick={handleLogout}>Logout</a></li>
          <li><a>View Profile </a></li>
        </ul>
      </div>

      :
      <div className="flex-row">
        <NavLink to="/login" className="btn btn-ligth"> Login </NavLink>

      </div>
  );
};

export default UserProfile;