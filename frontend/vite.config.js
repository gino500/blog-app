import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: process.env.PORT || 3000,

    proxy: {
      "/api": {
        target: [
          "https://blog-app-production-40c0.up.railway.app",
          "http://localhost:3000/",
        ],
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
