'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { NetworkMap, defaultNetwork } from '@/config/network';
import { Network } from '@/types/network';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const NetworkSwitcher = () => {
  const router = useRouter();

  const handleChange = useCallback(
    (value: Network) => {
      router.push(`/?network=${value}`);
    },
    [router]
  );

  return (
    <Select defaultValue={defaultNetwork} onValueChange={handleChange}>
      <SelectTrigger className="h-[1.625rem] p-[0.62rem] lg:h-[2.625rem] lg:px-[0.62rem]">
        <SelectValue placeholder="Select a network" className="text-[0.875rem]" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Network.MAINNET} className="text-[0.875rem]">
          {NetworkMap[Network.MAINNET].title}
        </SelectItem>
        <SelectItem value={Network.TESTNET} className="text-[0.875rem]">
          {NetworkMap[Network.TESTNET].title}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default NetworkSwitcher;
