'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { NetworkMap } from '@/config/network';
import { DEPLOY_ENV } from '@/types/env';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const defaultNetwork = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE as DEPLOY_ENV;

const NetworkSwitcher = () => {
  const router = useRouter();

  const handleChange = useCallback(
    (value: DEPLOY_ENV) => {
      const switchTo = NetworkMap[value].url;
      if (switchTo) {
        router.push(switchTo);
      }
    },
    [router]
  );

  return (
    <Select defaultValue={defaultNetwork} onValueChange={handleChange}>
      <SelectTrigger className="h-[1.625rem] p-[0.62rem] lg:h-[2.625rem] lg:px-[0.62rem]">
        <SelectValue placeholder="Select a network" className="text-[0.875rem]" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DEPLOY_ENV.MAINNET} className="text-[0.875rem]">
          {NetworkMap[DEPLOY_ENV.MAINNET].title}
        </SelectItem>
        <SelectItem value={DEPLOY_ENV.TESTNET} className="text-[0.875rem]">
          {NetworkMap[DEPLOY_ENV.TESTNET].title}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
