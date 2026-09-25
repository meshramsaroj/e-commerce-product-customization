import { faCartShopping, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div>
        <h1 className="logo">Shoppee</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-cneter">
          <li className="flex justify-between flex-row items-center">
            <span><FontAwesomeIcon icon={faLocationDot} /></span>
            <div className="flex flex-col items-baseline gap-0">
              <p>Delivering to Current location, pincode</p>
              <button>Update location</button>
            </div>
          </li>
          <li>
            <div className="join">
              <div>
                <label className="input w-md validator join-item">
                  <input type="text" placeholder="Search..." required />
                </label>
              </div>
              <button className="btn btn-neutral bg-orange-300 join-item"><FontAwesomeIcon className="text-black" icon={faMagnifyingGlass} /></button>
            </div>
          </li>
          <li>
            <span><FontAwesomeIcon size={"xl"} className="text-red-600" icon={faCartShopping} /> 0</span>
          </li>
          <li><UserProfile /> </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;