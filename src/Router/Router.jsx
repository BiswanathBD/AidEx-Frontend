import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";

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
    element: <Login />
  },
]);

export default router;
