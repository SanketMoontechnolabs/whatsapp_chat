import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  jsx: "react-jsx",
  esbuild: {
    loader: "jsx",
    include: /.\/src\/.*\.js?$/,
    exclude: [],
    jsx: "automatic",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },  
    },
  },
});
