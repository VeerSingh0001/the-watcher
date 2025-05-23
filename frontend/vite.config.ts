import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Pages()],
  build: {
    outDir: '../public', // relative path to your desired folder
    emptyOutDir: true,   // clear the folder before each build
  }
});
