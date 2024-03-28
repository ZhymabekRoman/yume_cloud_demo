"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/styles/App.css";

import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div>
            Где-то в коде произошла ошибка. Пожалуйста, обратитесь к
            разработчику.
          </div>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
