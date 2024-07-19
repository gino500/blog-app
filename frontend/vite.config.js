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
  // server: {
  //   port: 3000,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:5000",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
