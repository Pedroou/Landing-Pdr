import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Two static pages, no client-side router: GitHub Pages serves
// /Landing-Pdr/ and /Landing-Pdr/cv/ directly.
export default defineConfig({
  base: "/Landing-Pdr/",
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        landing: "index.html",
        cv: "cv/index.html",
      },
    },
  },
});
