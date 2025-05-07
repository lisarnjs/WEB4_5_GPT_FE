import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLogin from "../pages/AdminLogin";
import ResetPassword from "../pages/ResetPassword";
import LectureList from "../pages/LectureList";
import MainPage from "../pages/Home";
import MyPage from "../pages/MyPage";
import RegisterCourses from "../pages/RegisterCourses";
import {
  ADMIN_LOGIN_PATH,
  HOME_PATH,
  LECUTRE_PATH,
  LOGIN_PATH,
  MY_PAGE_PATH,
  REGISTER_COURSES_PATH,
  RESET_PW_PATH,
  SIGNUP_PATH,
} from "../constants/route.constants";
import MemberLoginLayout from "../components/layout/MemberLoginLayout";

const router = createBrowserRouter([
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
  {
    path: ADMIN_LOGIN_PATH,
    element: <AdminLogin />,
  },
  {
    path: SIGNUP_PATH,
    element: <Signup />,
  },
  {
    path: RESET_PW_PATH,
    element: <ResetPassword />,
  },
  {
    path: "/member",
    element: <MemberLoginLayout />,
    children: [
      {
        path: "home",
        element: <MainPage />,
      },
      {
        path: "lecture",
        element: <LectureList />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      { path: "register-courses", element: <RegisterCourses /> },
    ],
  },
]);
export default router;
