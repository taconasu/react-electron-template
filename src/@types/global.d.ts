// preload.jsでcontextBridgeした場合のWindowオブジェクトの型拡張
export default interface Ipc {
  // send: () => Promise<void>;
}

declare global {
  interface Window {
    ipc: Ipc;
  }
}