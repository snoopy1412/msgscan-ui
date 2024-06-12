'use client';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';

import OrmpIcon from '@/components/icon/ormp';
import { useQuery } from '@tanstack/react-query';
import MessageStatus from '@/components/MessageStatus';
import OrmpInfo from './components/OrmpInfo';
import { useParams } from 'next/navigation';
import { fetchMessage, fetchOrmpInfo } from '@/graphql/services';
import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { protocols } from '@/config/protocols';
import ChainTxDisplay from '@/components/ChainTxDisplay';

import { Separator } from '@/components/ui/separator';
import ClipboardIconButton from '@/components/ClipboardIconButton';
import ExplorerLinkButton from '@/components/ExplorerLinkButton';
import { REFRESH_INTERVAL } from '@/config/site';

function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => fetchMessage(id),
    refetchInterval: REFRESH_INTERVAL
  });
}

function useOrmpInfo(id: string) {
  return useQuery({
    queryKey: ['ormpInfo', id],
    queryFn: async () => fetchOrmpInfo(id)
  });
}

const TxDetail = () => {
  const params = useParams();
  const { data, isPending } = useMessage(params?.id as string);

  console.log('data', data);

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
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight: 'calc(100vh - var(--header-height) - var(--footer-height))' }}
    >
      <div>
        <h3 className="animate-ellipsis text-center text-xl text-foreground">Search</h3>
        <Separator className="my-2" />
        <div className="flex flex-col items-center">
          <p className="text-center text-sm text-secondary-foreground">
            Messages sometimes take up to a minute to be indexed.
          </p>
          <p className="text-center text-sm text-secondary-foreground">
            please wait or try again later.
          </p>
          <Button className="mt-4 p-0">
            <Link href="/" className="block w-full px-4 py-2">
              Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <header className="my-5 text-xl font-light leading-8 text-foreground">
        <FlipWords words={words} />
      </header>
      <div className="flex flex-col gap-[0.12rem]">
        <Card title="MsgId" icon={<SquareUser size={22} strokeWidth={1.25} />} loading={isPending}>
          <div className="w-full break-words">{data?.message?.id}</div>
        </Card>

        <Card
          title="Status"
          icon={<PackageSearch size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          {typeof data?.message?.status !== 'undefined' && (
            <MessageStatus status={data?.message?.status} />
          )}
        </Card>

        <Card
          title="Source Transaction Hash"
          icon={<ArrowRightFromLine size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          <div className="flex items-center">
            {data?.message?.sourceTransactionHash ? (
              <ChainTxDisplay
                chain={sourceChain}
                className="w-[90%] max-w-[calc(100vw-14rem)]"
                rootClassName="gap-[0.62rem]"
                isFullText
                value={data?.message?.sourceTransactionHash}
                isLink={false}
              >
                <ClipboardIconButton text={data?.message?.sourceTransactionHash} size={16} />

                {sourceChain ? (
                  <ExplorerLinkButton
                    url={`${sourceChain?.blockExplorers?.default?.url}/tx/${data?.message?.sourceTransactionHash}`}
                  />
                ) : null}
              </ChainTxDisplay>
            ) : null}
          </div>
        </Card>

        <Card
          title="Target Transaction Hash"
          icon={<ArrowRightToLine size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          <div className="flex items-center">
            {data?.message?.targetTransactionHash ? (
              <ChainTxDisplay
                chain={targetChain}
                className="w-[90%] max-w-[calc(100vw-14rem)]"
                rootClassName="gap-[0.62rem]"
                isFullText
                value={data?.message?.targetTransactionHash}
                isLink={false}
              >
                <ClipboardIconButton text={data?.message?.targetTransactionHash} size={16} />
                {targetChain ? (
                  <ExplorerLinkButton
                    url={`${sourceChain?.blockExplorers?.default?.url}/tx/${data?.message?.targetTransactionHash}`}
                  />
                ) : null}
              </ChainTxDisplay>
            ) : null}
          </div>
        </Card>

        <Card
          title="Messaging Protocol"
          icon={<MessageSquareCode size={22} strokeWidth={1.25} />}
          loading={isPending}
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
          icon={<MessageSquareWarning size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          <div className="w-full break-words rounded bg-background p-5">
            {data?.message?.payload}
          </div>
        </Card>

        <Card
          title="Message Params"
          icon={<MessageSquareQuote size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          <div className="w-full break-words rounded bg-background p-5">
            {data?.message?.params}
          </div>
        </Card>

        <Card
          title="Source Dapp Address"
          icon={<LayoutGrid size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          {data?.message?.sourceDappAddress ? (
            <div className="flex w-full items-center gap-[0.62rem]">
              <span className="max-w-[calc(100vw-10rem)] truncate">
                {data?.message?.sourceDappAddress}
              </span>
              <ClipboardIconButton text={data?.message?.sourceDappAddress} size={16} />
              {sourceChain ? (
                <ExplorerLinkButton
                  url={`${sourceChain?.blockExplorers?.default?.url}/address/${data?.message?.sourceDappAddress}`}
                />
              ) : null}
            </div>
          ) : null}
        </Card>

        <Card
          title="Source Port Address"
          icon={<Unplug size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          {data?.message?.sourcePortAddress ? (
            <div className="flex w-full items-center gap-[0.62rem]">
              <span className="max-w-[calc(100vw-10rem)] truncate">
                {data?.message?.sourcePortAddress}
              </span>
              <ClipboardIconButton text={data?.message?.sourcePortAddress} size={16} />
              {sourceChain ? (
                <ExplorerLinkButton
                  url={`${sourceChain?.blockExplorers?.default?.url}/address/${data?.message?.sourcePortAddress}`}
                />
              ) : null}
            </div>
          ) : null}
        </Card>

        <Card
          title="Target Dapp Address"
          icon={<LayoutGrid size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          {data?.message?.targetDappAddress ? (
            <div className="flex w-full items-center gap-[0.62rem]">
              <span className="max-w-[calc(100vw-10rem)] truncate">
                {data?.message?.targetDappAddress}
              </span>
              <ClipboardIconButton text={data?.message?.targetDappAddress} size={16} />
              {targetChain ? (
                <ExplorerLinkButton
                  url={`${sourceChain?.blockExplorers?.default?.url}/address/${data?.message?.targetDappAddress}`}
                />
              ) : null}
            </div>
          ) : null}
        </Card>
        <Card
          title="Target Port Address"
          icon={<Unplug size={22} strokeWidth={1.25} />}
          loading={isPending}
        >
          {data?.message?.targetPortAddress ? (
            <div className="flex w-full items-center gap-[0.62rem]">
              <span className="max-w-[calc(100vw-10rem)] truncate">
                {data?.message?.targetPortAddress}
              </span>
              <ClipboardIconButton text={data?.message?.targetPortAddress} size={16} />
              {targetChain ? (
                <ExplorerLinkButton
                  url={`${sourceChain?.blockExplorers?.default?.url}/address/${data?.message?.targetPortAddress}`}
                />
              ) : null}
            </div>
          ) : null}
        </Card>

        <Card title="ORMP Info" icon={<OrmpIcon />} loading={isPending}>
          <OrmpInfo />
        </Card>
      </div>
    </div>
  );
};

export default TxDetail;
