import { Children, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../constants/route.constants";

export default function MemberLoginLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 필요합니다.");
      navigate(LOGIN_PATH);
    }
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
