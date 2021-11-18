import { Configuration } from 'electron-builder'

/* https://www.electron.build/configuration/configuration.html */
export const config = {
  appId: "com.xland.app",
  productName: "react-electron-template",
  directories: {
    output: 'dist',
    app: 'dist',
  },
  extends: null,
  mac: {
    target: 'dmg',
    icon: 'public/ninja-icon.png'
  },
  win: {
    target: 'nsis',
    icon: 'public/ninja-icon.png'
  },
  publish: {
    provider: "github",
    owner: "taconasu",
    repo: "react-electron-template",
    releaseType: "release"
  }
} as Configuration

export const env = {
  dev: {
    ENV_NAME: "dev",
  },
  test: {
    ENV_NAME: "test",
  },
  release: {
    ENV_NAME: "release",
  },
}
