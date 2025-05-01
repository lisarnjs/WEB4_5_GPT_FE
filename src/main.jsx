import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { worker } from "./mocks/browser.js";

if (import.meta.env.DEV) {
  // const { worker } = await import("./mocks/browser");
  worker.start();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
