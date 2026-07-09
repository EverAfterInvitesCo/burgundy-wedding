import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // The base path must match your repository name exactly for GitHub Pages
  base: '/burgundy-wedding/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensures that the built files use the base path for all resource links
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: false,
  },
  // Ensures Vite correctly handles the public directory relative to the base
  publicDir: 'public',
});
