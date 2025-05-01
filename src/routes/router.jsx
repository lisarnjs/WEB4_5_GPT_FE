import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLogin from "../pages/AdminLogin";
import ResetPassword from "../pages/ResetPassword";
import LectureList from "../pages/LectureList";

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
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/lecture",
    element: <LectureList />,
  },
]);
export default router;
