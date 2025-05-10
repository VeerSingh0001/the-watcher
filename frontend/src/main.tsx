import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import DataProvider from "./contexts/DataContext.tsx";
import LogProvider from "./contexts/LogContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <LogProvider>
          <App />
        </LogProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
