import { CommandRequest } from "src/shared/Commands";

export {};

declare global {
  interface Window {
    acquireVsCodeApi: () => {
      postMessage(message: CommandRequest): void;
      getState<T>(): any;
      setState<T>(state: any): void;
    };
  }
}
