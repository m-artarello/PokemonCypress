import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/pokemon/tipo': {
  //       target: 'http://localhost:8025',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
