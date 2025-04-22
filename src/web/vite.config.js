import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "./",
  build: {
    outDir: "../../media",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
  },
});
