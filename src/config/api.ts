import { DEPLOY_ENV } from '@/types/env';

export const APP_BASE_API_URL_MAP = {
  [DEPLOY_ENV.MAINNET]: 'http://g2.generic.darwinia.network:42049',
  [DEPLOY_ENV.TESTNET]: 'http://g2.generic.darwinia.network:42049'
};

export const APP_BASE_API_URL =
  APP_BASE_API_URL_MAP[process.env.NEXT_PUBLIC_DEPLOYMENT_MODE as DEPLOY_ENV];
