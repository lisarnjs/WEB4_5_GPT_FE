// src/layouts/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../admin/Header";
import Sidebar from "../admin/Sidebar";
import Footer from "../admin/Footer";

const AdminLayout = () => {
  return (
    <div
      className="admin-layout"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* 헤더 */}
      <Header />

      <div style={{ flex: 1, display: "flex" }}>
        {/* 사이드바 */}
        <Sidebar />

        {/* 메인 콘텐츠 영역 */}
        <main
          style={{ flex: 1, padding: "32px", background: "#f9f9f9" }}
          className="w-full overflow-scroll"
        >
          {/* {children} */}
          <Outlet />
        </main>
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
