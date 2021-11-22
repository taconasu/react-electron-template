// preload.jsでcontextBridgeした場合のWindowオブジェクトの型拡張
export default interface Ipc {
  getVersion: () => string;
}

declare global {
  export interface Window {
    ipc: Ipc;
  }
}
