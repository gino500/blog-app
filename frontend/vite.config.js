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
  server: {
    port: process.env.PORT || 8080,
    proxy: {
      "/api": {
        target: "blog-app-production-0294.up.railway.app",
        changeOrigin: true,
      },
    },
  },
});
