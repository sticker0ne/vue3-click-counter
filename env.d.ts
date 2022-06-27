/// <reference types="vite/client" />
interface ImportMetaEnv {
  APP_SUPABASE_URL: string;
  APP_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
