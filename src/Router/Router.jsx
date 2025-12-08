import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Homepage from "../Pages/Homepage";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";

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
]);

export default router;
