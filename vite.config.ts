import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer(),
    {
      name: 'generate-spa-files',
      writeBundle() {
        // Netlify/Vercel _redirects
        writeFileSync('dist/_redirects', '/*    /index.html   200');

        // Apache .htaccess
        const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]`;
        writeFileSync('dist/.htaccess', htaccessContent);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
