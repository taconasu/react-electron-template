# react-electron-template

React + Vite + Electron の最小構成のボイラープレート

## リリースについて

:warning: 手動でタグ打ちはしないこと！

手動でタグ打ちをするとタグとpackage.jsonのversion情報に差分が出来てしまう。
`npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`を利用して差分が発生しないようにpushすること。

## Scripts

### start

viteでサーバーを起動しElectronアプリケーションを開く。
ローカル起動時はhttpアクセスをするためHMRが有効。

```sh
$ npm run start
```

### dev

ローカル環境で利用しているOSに応じたパッケージを作成する。
`dist`配下にMacならdmg、Windowsならexeファイルが出力されるのでそれを利用して動作確認をする。

```sh
$ npm run dev
```

### build

GitHub Releasesにパブリッシュする際に[action-electron-builder](https://github.com/marketplace/actions/electron-builder-action)が利用するコマンド。

開発時に手動で利用することはない。
ローカルでパッケージ化して動作確認したい場合は上述した`dev`コマンドを使う。

### vite

Electronの起動はせず、viteでサーバーを起動するのみ。
WEBブラウザで簡単な動作を見たい場合に使う。

```sh
$ npm run vite
```

## env

環境変数については以下で定義する。

### .env

基本的にここに定義していく。
フロントで参照するような値の場合、環境変数名に`VITE_`プレフィクスが必要。
また、参照する際は`import.meta.env.環境変数名`でアクセスする。

[Env Variables and Modes - vitejs.dev](https://vitejs.dev/guide/env-and-mode.html)

.envで定義した環境変数はElectronのプロセス内でも参照可能。
