import { faBars, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <aside className="min-h-full w-64 bg-base-200">
        <ul className="menu w-full p-4">
          <li>
            <button>
              <FontAwesomeIcon icon={faHouse} />
              <span>Homepage</span>
            </button>
          </li>

          <li>
            <button>
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Menu;