import { Base } from './base'
import path from 'path'
import fs from 'fs'
import log from '../logger'

export class Build extends Base {
  constructor() {
    super()
  }

  /**
   * Electronアプリケーション用のpackage.json生成
   */
  protected preparePackageJson(): void {
    const pkgJsonPath = path.join(process.cwd(), "package.json");
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    //https://github.com/electron-userland/electron-builder/issues/4157#issuecomment-596419610
    const electronConfig = localPkgJson.devDependencies.electron.replace("^","");
    delete localPkgJson.scripts
    delete localPkgJson.devDependencies
    delete localPkgJson.build
    localPkgJson.devDependencies = {electron:electronConfig}
    fs.writeFileSync(
      path.join(this.distDir, "package.json"),
      JSON.stringify(localPkgJson)
    );
    // node_modulesがない場合作っておく
    if (!fs.existsSync(`${this.distDir}/node_modules`)) {
      fs.mkdirSync(path.join(this.distDir, "node_modules"));
    }
  }

  async start() {
    log('Reactアプリケーションをビルドしています')
    await this.buildRender()

    log('package.jsonを生成しています')
    this.preparePackageJson()

    log('Electronのエントリファイルをビルドしています')
    this.buildMain('release')
  }
}