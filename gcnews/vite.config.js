// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://138.2.124.21:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

