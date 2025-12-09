import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Homepage from "../Pages/Homepage";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Private from "../Private/Private";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Private>
            <DashboardHome />
          </Private>
        ),
      },
    ],
  },
]);

export default router;
