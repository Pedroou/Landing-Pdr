// Job titles sit between body text (400) and company names (600).
import "@fontsource/instrument-sans/500.css";
import "../../styles/base.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cv } from "./Cv";

// biome-ignore lint/style/noNonNullAssertion: #root is static in cv/index.html.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Cv />
  </StrictMode>,
);
