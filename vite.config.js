// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import * as path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // <-- Now __dirname is defined!

// https://vitejs.dev/config/
export default defineConfig({
        content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            // Give it a short name, like 'matisse'
            matisse: ['"EVA-Matisse_Classic"', 'serif'],
            // Give your barcode font a name
            barcode: ['"Free 3 of 9 Regular"', 'sans-serif'],
          },
        },
      },
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});