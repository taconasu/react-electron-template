import log from '../logger'
import vite, { ViteDevServer } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import chalk from 'chalk'
import path from 'path'
import execa from 'execa'
import { Base } from './base'

export class Dev extends Base {
  constructor() {
    super()
  }

  private viteServer: ViteDevServer
  protected viteServerPort = Number(process.env.PORT) || 3000

  private async createViteServer() {
    const options: vite.InlineConfig = {
      root: path.resolve(process.cwd(), 'src/renderer/'),
      plugins: [reactRefresh()],
    }
    this.viteServer = await vite.createServer(options);
    this.viteServer.httpServer.on("error", (e: any) => this.viteServerOnErr(e))
    this.viteServer.httpServer.on("data", (e: any) => {
      console.log(e.toString())
    })
    this.viteServer.listen(this.viteServerPort, false)
  }

  private viteServerOnErr(err) {
    if (err.code === "EADDRINUSE") {
      console.log(
        `Port ${this.viteServerPort} is in use, trying another one...`
      )
      setTimeout(() => {
        this.viteServer.close();
        this.viteServerPort += 1;
        this.viteServer.listen(this.viteServerPort);
      }, 100)
    } else {
      console.error(chalk.red(`[vite] server error:`))
      console.error(err)
    }
  }

  private createElectronProcess() {
    try {
      execa.command('electron dev/entry.js')
    } catch(error) {
      log(`${chalk.red('error -')} ${error}`)
    }
  }

  async start(): Promise<void> {
    log('Electronのエントリファイルを生成しています')
    this.buildMain('dev')

    log('Webサーバを起動します')
    await this.createViteServer()

    log('Electronアプリケーションを起動します')
    this.createElectronProcess()
  }
}
