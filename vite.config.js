import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
  },
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['esm-dep < cjs-dep'],
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
