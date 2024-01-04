import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/fm-comments-section-local-storage/",
  plugins: [react()],
});
