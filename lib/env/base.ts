import path from 'path'
import fs from 'fs'
import vite from 'vite'
import dotenv from 'dotenv'
import { config, env } from '../../electron.config'
import { Configuration } from 'electron-builder'
import esbuild from 'esbuild'
import os from 'os'

export class Base {
  protected config: Configuration = config
  protected env = env
  protected rootPath: string = process.cwd()
  protected distDir: string = path.join(this.rootPath, 'dist')
  protected releaseDir: string = path.join(this.rootPath, 'release')

  constructor() {
    // .env読み込み
    dotenv.config()
  }

  /**
   * vite build処理
   * https://vitejs.dev/guide/api-javascript.html#build
   */
  protected buildRender(): Promise<any> {
    // vite.config.ts をもとにビルドする
    return vite.build()
  }

  /**
   * electron起動用のビルド処理
   * @param env
   */
   protected buildMain(env = "dev"): void {
    const outfile = path.join(env === 'dev' ? 'dev' : 'dist', "entry.js")
    const entryFilePath = path.join(this.rootPath, 'src/main/index.ts')
    // esbuildによるバンドル処理
    esbuild.buildSync({
      entryPoints: [entryFilePath],
      outfile,
      minify: env === "release",
      bundle: true,
      platform: "node",
      // sourcemap: env === "dev",
      sourcemap: false,
      external: ["electron"],
    });
    // preload.jsのコピー
    const preloadFile = path.join(this.rootPath, "src/main/preload.js");
    fs.copyFileSync(
      preloadFile,
      path.join(env === "dev" ? "dev" : "dist", "preload.js")
    );
    // 環境変数設定
    const envObj = this.env[env];
    envObj.ENV = env;
    const envScript = `process.env={...process.env,...${JSON.stringify(envObj)}};`
    const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`;
    fs.writeFileSync(outfile, js);
  }
}
