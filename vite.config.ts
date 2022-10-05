import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(process.env.PORT || 8000),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@tests': resolve(__dirname, './tests'),
      },
    },
  });
};
