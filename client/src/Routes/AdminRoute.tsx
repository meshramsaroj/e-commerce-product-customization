import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../component/Layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "products",
            // element: <AdminProducts />,
          },
          {
            path: "categories",
            // element: <AdminCategories />,
          },
          {
            path: "orders",
            // element: <AdminOrders />,
          },
          {
            path: "users",
            // element: <AdminUsers />,
          },
        ],
      },
    ],
  },
]);

export default router