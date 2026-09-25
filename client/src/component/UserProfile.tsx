import { useQuery } from "@tanstack/react-query";
import { getLoginUserDetails } from "../API_Service/authAPI";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";


const UserProfile = () => {
  const { data: user } = useQuery({
    queryKey: ["user-details"],
    queryFn: getLoginUserDetails
  })


  return (
    user ?
      // <div className="avatar">
      //   <div className="w-24 rounded-full">
      //     <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
      //   </div>
      // </div>
      <div className="dropdown dropdown-bottom">
        <div className="avatar avatar-placeholder" tabIndex={0} role="button">
          <FontAwesomeIcon size="2x" icon={faUserCircle} />
          <span className="text-sm">{user.firstName}</span>
        </div>
        <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>Logout</li>
          <li>View Profile</li>
        </ul>
      </div>

      :
      <>
        <NavLink to="/login" className="btn btn-link"> Login </NavLink>

        <NavLink to="/register" className="btn btn-primary"> Create Account</NavLink>
      </>
  );
};

export default UserProfile;