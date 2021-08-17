import { BrowserWindow, webContents } from "electron"

class Page {
  public load(win: BrowserWindow | webContents, url: string) {
    if (process.env.ENV === "dev") {
      win.loadURL(`http://localhost:${ process.env.PORT || 3000 }`)
    } else {
      win.loadURL(`file://${__dirname}/${url}`)
    }
  }
}
export const page = new Page()
