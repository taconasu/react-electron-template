// preload.jsでcontextBridgeした場合のWindowオブジェクトの型拡張
export default interface Ipc {
  getVersion: () => string;
}

declare global {
  interface Window {
    ipc: Ipc;
  }
}