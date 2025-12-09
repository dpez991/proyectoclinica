import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "url";
import * as glob from "glob";

import HandlebarsPlugin from "vite-plugin-handlebars";

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { resolve, extname } = path;

function obtenerEntradas() {
  const files = glob.sync("./*.html"); 
  return Object.fromEntries(
    files.map((file) => [
      file.slice(0, file.length - extname(file).length),
      resolve(__dirname, file),
    ])
  );
}

export default defineConfig({
  appType: "mpa",
  build: {
    outDir: "dist",
    minify: false,
    rollupOptions: {
      input: obtenerEntradas(),
    },
  },
  plugins: [
    HandlebarsPlugin({
      partialDirectory: resolve(__dirname, "src", "partials"),
    }),
  ],
});