import {
  faBars,
  faCartShopping,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">

      {/* Hamburger */}
      <div className="flex-none">
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost"
          aria-label="open sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>

      {/* Location */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />

          <div className="flex flex-col">
            <p className="text-sm">
              Delivering to Current location, pincode
            </p>

            <button className="text-left text-sm text-orange-500">
              Update location
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:block">
        <div className="join">
          <label className="input validator join-item w-md">
            <input
              type="text"
              placeholder="Search..."
              required
            />
          </label>

          <button className="btn btn-neutral bg-orange-300 join-item">
            <FontAwesomeIcon
              className="text-black"
              icon={faMagnifyingGlass}
            />
          </button>
        </div>
      </div>

      {/* Cart */}
      <div className="flex-none ml-4">
        <button className="btn btn-ghost">
          <FontAwesomeIcon
            size="xl"
            className="text-red-600"
            icon={faCartShopping}
          />
          <span>0</span>
        </button>
      </div>

      {/* Profile */}
      <div className="flex-none">
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;