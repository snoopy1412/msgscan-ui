'use client';

import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { useMessage } from '@/hooks/services';
import Pending from './Pending';
import TxDetail from './TxDetail';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import useBreakpoint from '@/hooks/breakpoint';

interface ClientPageProps {
  id: string;
}
export default function ClientPage({ id }: ClientPageProps) {
  const breakpoint = useBreakpoint();
  const [iconSize, setIconSize] = useState(22);
  const { data, isPending, isSuccess, isError } = useMessage(id as string);

  const sourceChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.sourceChainId) as unknown as ChAIN_ID)
  );

  const targetChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.targetChainId) as unknown as ChAIN_ID)
  );

  useEffect(() => {
    if (breakpoint === 'desktop') {
      setIconSize(22);
    } else {
      setIconSize(18);
    }
  }, [breakpoint]);

  if ((isSuccess || isError) && !data?.message) {
    return <NotFound />;
  }
  if (isPending) {
    return <Pending />;
  }
  return data?.message ? (
    <TxDetail
      id={id}
      sourceChain={sourceChain}
      targetChain={targetChain}
      message={data?.message}
      iconSize={iconSize}
    />
  ) : null;
}
