import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Homepage from "../Pages/Homepage";

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
]);

export default router;
