export enum Network {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export const NetworkMap = {
  [Network.Testnet]: {
    title: "Testnet",
    url: "https://testnet.scan.msgport.xyz",
  },
  [Network.Mainnet]: {
    title: "Mainnet",
    url: "https://scan.msgport.xyz",
  },
};
