import { Children, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LOGIN_PATH,
  REGISTER_COURSES_PATH,
} from "../../constants/route.constants";
import Header from "../common/Header";
import { useLocation } from "react-router-dom";

export default function MemberLoginLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 필요합니다.");
      navigate(LOGIN_PATH);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50  text-gray-800">
      {pathname !== REGISTER_COURSES_PATH && <Header />}
      <div className="bg-white h-[calc(100vh-theme(spacing.headerHeight))]">
        <Outlet />
      </div>
    </div>
  );
}
