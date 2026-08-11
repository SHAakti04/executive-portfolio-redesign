import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles.css";

// Mark the document as JS-ready so CSS-side hero keyframes are disabled and
// GSAP fully owns the hero entrance (prevents double-run + flash).
if (typeof document !== "undefined") {
  document.documentElement.classList.add("gsap-ready");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
