import { Configuration } from 'electron-builder'

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
