import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="drawer">

            {/* Drawer state */}
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            {/* Main content */}
            <div className="drawer-content">

                <Navbar />

                <main>
                    <Outlet />
                </main>

            </div>

            {/* Sidebar */}
            <Menu />

        </div>
    );
};

export default Layout;