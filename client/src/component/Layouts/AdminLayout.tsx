import { Outlet } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import Navbar from "../Navbar";

const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex min-h-[calc(100vh-4rem)]">
                <AdminSidebar />

                <div className="min-w-0 flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;