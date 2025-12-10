import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "url";
import * as glob from "glob";
import HandlebarsPlugin from "vite-plugin-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { resolve, extname } = path;

// Detectar HTMLs del proyecto
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

  // 🔥 IMPORTANTE para GitHub Pages
  base: "/proyectoclinica/",

  build: {
    outDir: "dist",
    minify: true,
    rollupOptions: {
      input: obtenerEntradas(),
    },
  },

  plugins: [
    HandlebarsPlugin({
      partialDirectory: resolve(__dirname, "src", "partials"),

      // 🟢 PASAMOS EL NOMBRE DEL HTML QUE SE ESTÁ RENDERIZANDO
      context: (pagePath) => {
        const page = pagePath.replace(__dirname + "/", "");

        return {
          isIndex: page.includes("index.html"),
          isServicios: page.includes("servicios.html"),
          isDirectorio: page.includes("directorio.html"),
          isVisita: page.includes("visita.html"),
          isContacto: page.includes("contacto.html"),
          isAcerca: page.includes("acerca.html"),

          // 🔥 PASAR BASE A LOS PARCIALES
          base: "/proyectoclinica/"
        };
      }
    }),
  ],
});