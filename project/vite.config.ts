import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["@paypal/react-paypal-js"],
  },
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  publicDir: "public",
  server: {
    port: 3000,
    open: true,
  },
});
