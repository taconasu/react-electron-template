export interface ElectronConfig {
  main: string,
  build: {
    appId: string,
    productName: string,
    mac?: {
      target: string,
      icon: string
    },
    win?: {
      target: string,
      icon: string
    }
  },
  env?: any
}

declare const config: ElectronConfig
export default config
