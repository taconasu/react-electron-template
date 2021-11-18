const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  getVersion: () => ipcRenderer.sendSync("getVersion")
});
