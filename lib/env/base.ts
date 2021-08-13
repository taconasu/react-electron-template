import path from 'path'
import fs from 'fs'
import vite from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { ElectronConfig } from '../../@types/electron.config'
import esbuild from 'esbuild'
import os from 'os'

export class Base {
  protected config: ElectronConfig
  protected rootPath: string = process.cwd()
  protected distDir: string = path.join(this.rootPath, 'dist')
  protected releaseDir: string = path.join(this.rootPath, 'release')

  constructor() {
    this.preparenConfig()
  }

  /**
   * 実行に必要な設定をする
   * 項目ごとの設定はviteron.config.jsにて行う
   */
  protected preparenConfig() {
    const configPath = path.join(process.cwd(), 'electron.config.ts')
    if (fs.existsSync(configPath)) {
      this.config = eval('require(configPath)')
    }
    if (!this.config.main) this.config.main = 'src/main/index.ts'
    if (!this.config.build) this.config.build = {
      appId: 'com.reactron.app',
      productName: 'react-electron-template'
    }
    if (!this.config.env) this.config.env = {}
    if (!this.config.env.test) this.config.env.test = {}
    if (!this.config.env.dev) this.config.env.dev = {}
    if (!this.config.env.release) this.config.env.release = {}

  }

  /**
   * vite build処理
   * https://vitejs.dev/guide/api-javascript.html#build
   */
  protected buildRender(): Promise<any> {
    // TODO: vite.config.tsを使いたい。build関数の引数が求めてくる型がInlineConfigじゃないから工夫が必要
    const options: vite.InlineConfig = {
      root: path.resolve(process.cwd(), 'src/renderer'),
      base: '',
      build: {
        outDir: path.resolve(process.cwd(), 'dist'),
        minify: 'esbuild',
        emptyOutDir: true,
      },
      plugins: [reactRefresh()],
    }
    return vite.build(options)
  }

  /**
   * electron起動用のビルド処理
   * @param env
   */
   protected buildMain(env = "dev"): void {
    const outfile = path.join(env === 'dev' ? 'dev' : 'dist', "entry.js")
    const entryFilePath = path.join(this.rootPath, this.config.main)
    // esbuildによるバンドル処理
    esbuild.buildSync({
      entryPoints: [entryFilePath],
      outfile,
      // minify: env === "release",
      minify: false,
      bundle: true,
      platform: "node",
      // sourcemap: env === "dev",
      sourcemap: false,
      external: ["electron"],
    });
    // 環境変数設定
    const envObj = this.config.env[env];
    envObj.ENV = env;
    const envScript = `process.env={...process.env,...${JSON.stringify(envObj)}};`
    const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`;
    fs.writeFileSync(outfile, js);
  }
}
