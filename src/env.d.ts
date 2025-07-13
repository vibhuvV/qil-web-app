/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_LS_KEY: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_S3_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
