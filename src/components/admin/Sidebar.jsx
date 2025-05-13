// components/admin/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ADMIN_MANAGE_USER_PATH,
  ADMIN_PROFESSOR_REGISTRATION_PATH,
} from "../../constants/route.constants";

const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <ul className="space-y-2">
        <li>
          <NavLink
            to={ADMIN_MANAGE_USER_PATH}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            회원 목록 조회
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ADMIN_PROFESSOR_REGISTRATION_PATH}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            교직원 등록 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
