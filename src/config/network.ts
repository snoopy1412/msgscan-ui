import { DEPLOY_ENV } from "@/types/env";

export const NetworkMap = {
  [DEPLOY_ENV.TESTNET]: {
    title: "Testnet",
    url: "https://testnet.scan.msgport.xyz",
  },
  [DEPLOY_ENV.MAINNET]: {
    title: "Mainnet",
    url: "https://scan.msgport.xyz",
  },
};
