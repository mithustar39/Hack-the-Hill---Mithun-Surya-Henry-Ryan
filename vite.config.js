import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:5174', // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, ''),
      },
    },
  },
});
