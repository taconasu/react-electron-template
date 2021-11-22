import { BrowserWindow, webContents } from 'electron';
import path from 'path';

class Page {
  public load(win: BrowserWindow | webContents, url: string) {
    if (process.env.ENV === 'dev') {
      win.loadURL(`http://localhost:${process.env.PORT || 3000}`);
    } else {
      win.loadURL(`file://${path.join(__dirname, url)}`);
    }
  }
}
export const page = new Page();
