import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  root: "src/view",
  
  build: {
    minify: true,
    emptyOutDir: true,
    outDir: "../../out/view",
    rollupOptions: {
      input: {
        app: 'src/view/index.tsx', // default
      },
    },
  },
  
});
