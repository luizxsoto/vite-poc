interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  API_URL: string;
}

export const envConfig: EnvConfig = {
  NODE_ENV: (import.meta.env.MODE as EnvConfig['NODE_ENV']) || 'development',
  PORT: Number(import.meta.env.VITE_PORT) || 8000,
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
};
