const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  // サンプル
  // send: () => ipcRenderer.send("send"),
});
