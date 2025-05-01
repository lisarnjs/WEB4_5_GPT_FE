import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// import { worker } from "./mocks/browser.js";

// if (import.meta.env.DEV) {
//   worker.start();
// }

// 🧪 테스트용 사용자 강제로 설정
import useAuthStore from "./store/authStore.js";
useAuthStore.getState().actions.setUser({
  id: 1,
  name: "홍길동",
  role: "ADMIN", // STUDENT | PROFESSOR | ADMIN
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
