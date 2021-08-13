import builder from 'electron-builder'

export default {
  main: "src/main/index.ts",
  build: {
    appId: "com.xland.app",
    productName: "react-electron-template",
    mac: {
      target: 'dmg',
      icon: 'public/ninja-icon.png'
    },
    win: {
      target: 'nsis',
      icon: 'public/ninja-icon.png'
    },
  },
  // env: {
  //   dev: {
  //     SERVICE_BASE_URL: "https://dev.yourdomain.site",
  //   },
  //   test: {
  //     SERVICE_BASE_URL: "https://test.yourdomain.site",
  //   },
  //   release: {
  //     SERVICE_BASE_URL: "https://release.yourdomain.site",
  //   },
  // },
} as builder.CliOptions
