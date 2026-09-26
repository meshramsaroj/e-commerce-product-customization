import { faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <aside className="min-h-full w-64 bg-base-200 p-4">
        <h3>Configuration</h3>
        <ul className="menu w-full p-4">
          <li>
            <button>
              <NavLink to={"/categories"}>
                <FontAwesomeIcon icon={faHouse} />
                <span>Category</span>
              </NavLink>

            </button>
          </li>

          <li>
            <button>
              <NavLink to={"/products"}>
                <FontAwesomeIcon icon={faGear} />
                <span>Product</span>
              </NavLink>

            </button>
          </li>

        </ul>
      </aside>
    </div>
  );
};

export default Menu;