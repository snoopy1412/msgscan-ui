'use client';
import {
  ArrowRightFromLine,
  ArrowRightToLine,
  LayoutGrid,
  MessageSquareCode,
  MessageSquareQuote,
  MessageSquareWarning,
  PackageSearch,
  SquareUser,
  Unplug
} from 'lucide-react';
import Card from './components/Card';
import { FlipWords } from '@/components/ui/flip-words';

import OrmpIcon from '@/components/icon/ormp';
import MessageStatus from '@/components/MessageStatus';
import OrmpInfo from './components/OrmpInfo';
import { useParams } from 'next/navigation';
import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { protocols } from '@/config/protocols';

import useBreakpoint from '@/hooks/breakpoint';
import { useMemo } from 'react';
import FadeInDown from '@/components/ui/fade-in-down';
import Pending from './components/Pending';
import BackToTop from '@/components/ui/back-to-top';
import TransactionHashInfo from './components/TransactionHashInfo';
import AddressInfo from './components/AddressInfo';
import { useMessage, useOrmpInfo } from '@/hooks/services';

const TxDetail = () => {
  const breakpoint = useBreakpoint();
  const params = useParams();
  const { data, isPending } = useMessage(params?.id as string);

  const iconSize = useMemo(() => {
    if (breakpoint === 'desktop') {
      return 22;
    }
    return 18;
  }, [breakpoint]);

  const { data: ormpInfo } = useOrmpInfo(params?.id as string);

  const protocol = protocols?.find((protocol) => protocol.value === data?.message?.protocol);
  const ProtocolIcon = protocol?.icon;

  const sourceChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.sourceChainId) as unknown as ChAIN_ID)
  );

  const targetChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.targetChainId) as unknown as ChAIN_ID)
  );
  const words = ['Transaction Details'];

  return isPending ? (
    <Pending />
  ) : (
    <FadeInDown duration={0.2}>
      <div>
        <header className="my-5 text-base font-light leading-8 text-foreground lg:text-xl">
          <FlipWords words={words} />
        </header>
        <div className="flex flex-col gap-[0.12rem]">
          <Card title="MsgId" icon={<SquareUser size={iconSize} strokeWidth={1.25} />}>
            <div className="w-full break-words">{data?.message?.id}</div>
          </Card>

          <Card title="Status" icon={<PackageSearch size={iconSize} strokeWidth={1.25} />}>
            {typeof data?.message?.status !== 'undefined' && (
              <MessageStatus status={data?.message?.status} />
            )}
          </Card>

          <Card
            title="Source Transaction Hash"
            icon={<ArrowRightFromLine size={iconSize} strokeWidth={1.25} />}
          >
            <TransactionHashInfo chain={sourceChain} hash={data?.message?.sourceTransactionHash} />
          </Card>

          <Card
            title="Target Transaction Hash"
            icon={<ArrowRightToLine size={iconSize} strokeWidth={1.25} />}
          >
            <TransactionHashInfo chain={targetChain} hash={data?.message?.targetTransactionHash} />
          </Card>

          <Card
            title="Messaging Protocol"
            icon={<MessageSquareCode size={iconSize} strokeWidth={1.25} />}
          >
            {protocol && ProtocolIcon ? (
              <div className="flex items-center gap-[0.31rem]">
                <ProtocolIcon />
                <span className="text-sm">{protocol.title}</span>
              </div>
            ) : null}
          </Card>

          <Card
            title="Message Payload"
            icon={<MessageSquareWarning size={iconSize} strokeWidth={1.25} />}
          >
            <div className="w-full break-words rounded bg-background p-5">
              {data?.message?.payload}
            </div>
          </Card>

          <Card
            title="Message Params"
            icon={<MessageSquareQuote size={iconSize} strokeWidth={1.25} />}
          >
            <div className="w-full break-words rounded bg-background p-5">
              {data?.message?.params}
            </div>
          </Card>

          <Card
            title="Source Dapp Address"
            icon={<LayoutGrid size={iconSize} strokeWidth={1.25} />}
          >
            <AddressInfo address={data?.message?.sourceDappAddress} chain={sourceChain} />
          </Card>

          <Card title="Source Port Address" icon={<Unplug size={iconSize} strokeWidth={1.25} />}>
            <AddressInfo address={data?.message?.sourcePortAddress} chain={sourceChain} />
          </Card>

          <Card
            title="Target Dapp Address"
            icon={<LayoutGrid size={iconSize} strokeWidth={1.25} />}
          >
            <AddressInfo address={data?.message?.targetDappAddress} chain={targetChain} />
          </Card>
          <Card title="Target Port Address" icon={<Unplug size={iconSize} strokeWidth={1.25} />}>
            <AddressInfo address={data?.message?.targetPortAddress} chain={targetChain} />
          </Card>

          <Card title="ORMP Info" icon={<OrmpIcon />}>
            <OrmpInfo />
          </Card>
        </div>
        <div className="flex items-center justify-end pt-4">
          <BackToTop />
        </div>
      </div>
    </FadeInDown>
  );
};

export default TxDetail;
