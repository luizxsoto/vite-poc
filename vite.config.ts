import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      host: process.env.VITE_HOST || '0.0.0.0',
      port: Number(process.env.VITE_PORT) || 8000,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@tests': resolve(__dirname, './tests'),
        '@mui/styled-engine': resolve(
          __dirname,
          './node_modules/@mui/styled-engine-sc'
        ),
      },
    },
  });
};
