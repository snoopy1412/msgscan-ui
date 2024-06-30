import { getChainsByNetwork } from '@/utils/network';
import SearchBar from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import MessagePortTable from '@/components/MessagePortTable';
import MessageProgressStats from '@/components/MessageProgressStats';

interface PageProps {
  searchParams: {
    network: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  const chains = getChainsByNetwork(searchParams?.network);
  return (
    <>
      <div className="block lg:hidden">
        <SearchBar />
      </div>
      <MessageProgressStats chains={chains} />
      <Separator className="hidden lg:block" />
      <MessagePortTable network={searchParams?.network} chains={chains} />
    </>
  );
}
