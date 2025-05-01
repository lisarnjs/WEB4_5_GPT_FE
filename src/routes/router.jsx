import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLogin from "../pages/AdminLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
export default router;
