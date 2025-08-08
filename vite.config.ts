import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increase warning limit to 1.5MB
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          pdfjs: [
            "pdfjs-dist",
            "@react-pdf-viewer/core",
            "@react-pdf-viewer/default-layout"
          ],
        },
      },
    },
  },
}));
