import { app, BrowserWindow, screen } from "electron";
import Store from 'electron-store';
import { page } from './page';

// ストアの項目の型定義
type StoreType = {
  window: {
    pos: Array<number>,
    size: Array<number>
  }
}
// ストアにサイズ情報がない場合のデフォルトサイズ定義
const DEFAULT_SIZE = {
  width: 800,
  height: 600
}

/**
 * ウィンドウの中央の座標を返却
 *
 * @return {array}
 */
 const getCenterPosition = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const x = Math.floor( (width - DEFAULT_SIZE.width) / 2)
  const y = Math.floor( (height - DEFAULT_SIZE.height) / 2)
  return([x, y])
}

/*
 * ------------------------
 * メインウィンドウ
 * ------------------------
 */
let window: BrowserWindow | null
const store = new Store<StoreType>()

function createWindow () {
  destroyWinow(window);

  const pos: Array<number> = store.get('window.pos')  || getCenterPosition()
  const size: Array<number> = store.get('window.size') || [DEFAULT_SIZE.width, DEFAULT_SIZE.height]

  window = new BrowserWindow({
    width: size[0],
    height: size[1],
    x: pos[0],
    y: pos[1],
    webPreferences: {
      preload: 'preload.js'
    }
  })
  page.load(window, "index.html")

  window.on('close', () => {
    if (!window) return

    store.set('window.pos', window.getPosition())  // ウィンドウの座標を記録
    store.set('window.size', window.getSize())     // ウィンドウのサイズを記録
    window = null
  });
}

/*
 * ------------------------
 * Util
 * ------------------------
 */
function destroyWinow(win: BrowserWindow | null) {
  if (!win) return;
  win.close();
  win = null;
}

/*
 * ------------------------
 * イベントハンドラ
 * ------------------------
 */
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
