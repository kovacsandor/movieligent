/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_JWT_TEMP: string;
    readonly REACT_APP_TITLE: string;
  }
}
