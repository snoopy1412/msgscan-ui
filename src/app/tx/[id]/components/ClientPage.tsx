'use client';

import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { useMessage } from '@/hooks/services';
import Pending from './Pending';
import TxDetail from './TxDetail';
import NotFound from './NotFound';
import { useMemo } from 'react';
import useBreakpoint from '@/hooks/breakpoint';

interface ClientPageProps {
  id: string;
}
export default function ClientPage({ id }: ClientPageProps) {
  const { data, isPending } = useMessage(id as string);
  const breakpoint = useBreakpoint();

  const iconSize = useMemo(() => {
    if (breakpoint === 'desktop') {
      return 22;
    }
    return 18;
  }, [breakpoint]);
  const sourceChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.sourceChainId) as unknown as ChAIN_ID)
  );

  const targetChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.targetChainId) as unknown as ChAIN_ID)
  );

  return isPending ? (
    <Pending />
  ) : data?.message ? (
    <TxDetail
      id={id}
      sourceChain={sourceChain}
      targetChain={targetChain}
      message={data?.message}
      iconSize={iconSize}
    />
  ) : (
    <NotFound />
  );
}
