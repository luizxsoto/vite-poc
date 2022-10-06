/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Server
  readonly VITE_HOST: string;
  readonly VITE_PORT: string;

  // Api
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
