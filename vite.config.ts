import path from "path"
import { defineConfig } from "vite"

const PKG_NAME = 'PLUS'
const fileName = {
  es: `${PKG_NAME}.mjs`,
  cjs: `${PKG_NAME}.cjs`,
  iife: `${PKG_NAME}.iife.js`,
}

module.exports = defineConfig({
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: PKG_NAME,
      formats: ["es", "cjs", "iife"],
      fileName: (format) => fileName[format],
    },
  },
})
