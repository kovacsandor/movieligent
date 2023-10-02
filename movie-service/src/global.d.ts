declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly JWT_SECRET: string;
    readonly TMDB_AUTH: string;
  }
}
