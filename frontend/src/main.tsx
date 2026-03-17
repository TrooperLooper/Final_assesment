import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { useUserStore } from "./stores/userStore";
import "./index.css";

// Initialize user validation on app load
useUserStore.getState().validateAndSetCurrentUser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
