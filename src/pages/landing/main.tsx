import "../../styles/base.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Landing } from "./Landing";

// biome-ignore lint/style/noNonNullAssertion: #root is static in index.html.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
