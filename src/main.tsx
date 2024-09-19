import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../src/component/navbar/navbar.css";
import "../src/pages/home/homepages/home.css";
import "../src/pages/home/message/message.css";
import { AppContext } from "./customHook/useAppContext.tsx";
import "../src/pages/subscribe/subscribe.css";
import "../src/customHook/spinner/spinner.css";
import "../src/pages/home/comment/comment.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>
);
