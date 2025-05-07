// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../apis/auth";
import {
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

  return (
    <nav className="mb-6 flex flex-wrap items-center justify-between border-b pb-4 text-sm text-gray-700">
      <h2 className="text-3xl font-bold">UniHub</h2>
      <div className="space-x-4">
        <Link to={REGISTER_COURSES_PATH}>수강신청</Link>
        <Link to={LECUTRE_PATH}>강의</Link>
        {/* <Link to="/election">선거</Link>
        <Link to="/notices">공지사항</Link> */}
        <Link to={MY_PAGE_PATH}>마이페이지</Link>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </nav>
  );
}
