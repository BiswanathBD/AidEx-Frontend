import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Homepage from "../Pages/Homepage";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Private from "../Private/Private";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CreateRequest from "../Pages/Dashboard/CreateRequest";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MyRequest from "../Pages/Dashboard/MyRequest";
import RequestDetails from "../Pages/Dashboard/RequestDetails";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AllRequests from "../Pages/Dashboard/AllRequests";
import EditRequest from "../Pages/Dashboard/EditRequest";
import DonationRequests from "../Pages/DonationRequests";
import SearchDonor from "../Pages/SearchDonor";
import Funding from "../Pages/Funding";
import PaymentError from "../Pages/PaymentError";
import PaymentSuccess from "../Pages/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/requests",
        element: <DonationRequests />,
      },
      {
        path: "/request/view/:id",
        element: (
          <Private>
            <RequestDetails />
          </Private>
        ),
      },
      {
        path: "/search",
        element: <SearchDonor />,
      },
      {
        path: "/funding",
        element: (
          <Private>
            <Funding />
          </Private>
        ),
      },
      {
        path: "/paymentError",
        element: <PaymentError />,
      },
      {
        path: "/paymentSuccess",
        element: <PaymentSuccess />,
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
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyRequest />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateRequest />,
      },
      {
        path: "/dashboard/donation-request/view/:id",
        element: <RequestDetails />,
      },
      {
        path: "/dashboard/donation-request/edit/:id",
        element: <EditRequest />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllRequests />,
      },
    ],
  },
]);

export default router;
