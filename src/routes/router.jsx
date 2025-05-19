import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLogin from "../pages/AdminLogin";
import ResetPassword from "../pages/ResetPassword";
import LectureList from "../pages/LectureList";
import MainPage from "../pages/Home";
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
import StudentMyPage from "../pages/MyPage/Student";
import ProfessorMypage from "../pages/MyPage/Professor";
import ManageUser from "../pages/Admin/ManageUser";
import AdminLayout from "../components/layout/AdminLayout";
import ProfessorRegistration from "../pages/Admin/ProfessorRegistration";
import AdminMypage from "../pages/MyPage/Admin";
import ManageRegistrationPeriod from "../pages/Admin/ManageRegistrationPeriod";
import InviteAdmin from "../pages/Admin/InviteAdmin";
import ManageMajors from "../pages/Admin/ManageMajors";
import ManageUniversities from "../pages/Admin/ManageUniversities";
import TimeTablePage from "../pages/TimeTable";

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
        path: "time-table",
        element: <TimeTablePage />,
      },
      {
        path: "lecture",
        element: <LectureList />,
      },
      {
        path: "my-page",
        children: [
          { path: "student", element: <StudentMyPage /> },
          { path: "professor", element: <ProfessorMypage /> },
          { path: "admin", element: <AdminMypage /> },
        ],
      },
      { path: "register-courses", element: <RegisterCourses /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "manage-user",
            element: <ManageUser />,
          },
          {
            path: "professor-registration",
            element: <ProfessorRegistration />,
          },
          {
            path: "manage-period",
            element: <ManageRegistrationPeriod />,
          },
          {
            path: "invite",
            element: <InviteAdmin />,
          },
          {
            path: "manage-major",
            element: <ManageMajors />,
          },
          {
            path: "manage-universities",
            element: <ManageUniversities />,
          },
        ],
      },
    ],
  },
]);
export default router;
