import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { writeFileSync } from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  server: {
    proxy: {
      // 로컬에서 /api로 시작하는 요청을 서버로 전달
      '/api': {
        target: 'https://zerone01.kr', // 실제 서버
        changeOrigin: true,             // 서버는 요청이 localhost에서 왔다고 생각하지 않음
        secure: true,                   // HTTPS 서버
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 경로 그대로 전달
      },
    },
  },
});
