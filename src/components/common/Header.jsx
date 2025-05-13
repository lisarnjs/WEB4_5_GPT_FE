// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import {
  ADMIN_MANAGE_USER_PATH,
  HOME_PATH,
  LECUTRE_PATH,
  LOGIN_PATH,
  MY_PAGE_PATH,
  REGISTER_COURSES_PATH,
} from "../../constants/route.constants";
import useAuthStore from "../../store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const { setLogout } = useAuthStore((state) => state.actions);

  const handleLogout = async () => {
    try {
      await logout();
      setLogout();
      navigate(LOGIN_PATH);
    } catch (err) {
      console.log(err);
    }
  };

  const myPageRole = localStorage.getItem("role").toLowerCase();

  return (
    <nav className=" flex flex-wrap items-center justify-between border-b px-6 py-8 text-sm text-gray-400">
      <h2 className="text-3xl font-bold">
        <Link to={HOME_PATH} className="text-md font-bold text-gray-700">
          UniHub
        </Link>
      </h2>
      <div className="space-x-4">
        {myPageRole === "student" && (
          <Link
            to={REGISTER_COURSES_PATH}
            className="text-md  hover:text-gray-700"
          >
            수강신청
          </Link>
        )}
        {myPageRole !== "admin" && (
          <Link to={LECUTRE_PATH} className="text-md  hover:text-gray-700">
            강의
          </Link>
        )}
        {/* <Link to="/election">선거</Link>
        <Link to="/notices">공지사항</Link> */}
        {myPageRole === "admin" && (
          <Link
            to={ADMIN_MANAGE_USER_PATH}
            className="text-md  hover:text-gray-700"
          >
            관리자 페이지
          </Link>
        )}
        <Link
          to={`${MY_PAGE_PATH}${myPageRole}`}
          className="text-md  hover:text-gray-700"
        >
          마이페이지
        </Link>
        <button onClick={handleLogout} className="text-md  hover:text-gray-700">
          로그아웃
        </button>
      </div>
    </nav>
  );
}
