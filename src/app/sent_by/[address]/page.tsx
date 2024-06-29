'use client';

import SearchBar from '@/components/SearchBar';

import { Separator } from '@/components/ui/separator';
import { FlipWords } from '@/components/ui/flip-words';
import { getChainsByNetwork } from '@/utils/network';
import MessagePortTable from '@/components/MessagePortTable';
import { CodeFont } from '@/config/font';
import { cn } from '@/lib/utils';

interface PageProps {
  params: {
    address: string;
  };
  searchParams: {
    network: string;
  };
}
export default function Page({ params, searchParams }: PageProps) {
  const chains = getChainsByNetwork(searchParams?.network);

  const words = [params?.address];
  return (
    <>
      <div className="block lg:hidden">
        <SearchBar />
      </div>
      <div className="py-4">
        <span className="text-xs text-muted-foreground">Address</span>
        <header className={cn('text-sm font-light text-foreground', CodeFont.className)}>
          <FlipWords words={words} />
        </header>
      </div>
      <Separator className="hidden lg:block" />
      <MessagePortTable
        network={searchParams?.network}
        sourceAddress={params?.address}
        chains={chains}
      />
    </>
  );
}
