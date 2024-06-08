'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightFromLine,
  ArrowRightToLine,
  ExternalLink,
  LayoutGrid,
  MessageSquareCode,
  MessageSquareQuote,
  MessageSquareWarning,
  PackageSearch,
  SquareUser,
  Unplug
} from 'lucide-react';
import Card from './components/Card';
import OrmpIcon from '@/components/icon/ormp';
import { useQuery } from '@tanstack/react-query';
import MessageStatus from '@/components/MessageStatus';
import OrmpInfo from './components/OrmpInfo';
import { useParams } from 'next/navigation';
import { fetchMessage, fetchOrmpInfo } from '@/graphql/services';
import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { protocols } from '@/config/protocols';

function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => fetchMessage(id)
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
  const { data, status, error, isFetching } = useMessage(params?.id as string);

  const { data: ormpInfo } = useOrmpInfo(params?.id as string);

  const protocol = protocols?.find((protocol) => protocol.value === data?.message?.protocol);
  const ProtocolIcon = protocol?.icon;

  const sourceChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.sourceChainId) as unknown as ChAIN_ID)
  );

  const targetChain = chains?.find(
    (chain) => chain.id === (Number(data?.message?.targetChainId) as unknown as ChAIN_ID)
  );
  return (
    <div>
      <header className="my-5 text-xl font-light leading-8 text-foreground">
        Transaction Details
      </header>
      <div className="flex flex-col gap-[0.12rem]">
        <Card title="MsgId" icon={<SquareUser size={22} strokeWidth={1.25} />}>
          <div className="w-full break-words">{data?.message?.id}</div>
        </Card>

        <Card title="Status" icon={<PackageSearch size={22} strokeWidth={1.25} />}>
          {typeof data?.message?.status !== 'undefined' && (
            <MessageStatus status={data?.message?.status} />
          )}
        </Card>

        <Card
          title="Source Transaction Hash"
          icon={<ArrowRightFromLine size={22} strokeWidth={1.25} />}
        >
          <div className="flex items-center">
            {sourceChain ? (
              <Image
                width={20}
                height={20}
                alt=""
                src={sourceChain.iconUrl}
                className="mr-[0.31rem] rounded-full"
              ></Image>
            ) : null}
            <div className="flex items-center gap-[0.62rem]">
              <span className="truncate">{data?.message?.sourceTransactionHash}</span>
              {sourceChain ? (
                <Link
                  href={`${sourceChain?.blockExplorers?.default?.url}/tx/${data?.message?.sourceTransactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {<ExternalLink size={16} strokeWidth={1.25} />}
                </Link>
              ) : null}
            </div>
          </div>
        </Card>

        <Card
          title="Target Transaction Hash"
          icon={<ArrowRightToLine size={22} strokeWidth={1.25} />}
        >
          <div className="flex items-center">
            {targetChain ? (
              <Image
                width={20}
                height={20}
                alt=""
                src={targetChain.iconUrl}
                className="mr-[0.31rem] rounded-full"
              ></Image>
            ) : null}
            <div className="flex items-center gap-[0.62rem]">
              <span className="truncate">{data?.message?.targetTransactionHash}</span>
              {targetChain ? (
                <Link
                  href={`${targetChain?.blockExplorers?.default?.url}/tx/${data?.message?.targetTransactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {<ExternalLink size={16} strokeWidth={1.25} />}
                </Link>
              ) : null}
            </div>
          </div>
        </Card>

        <Card title="Messaging Protocol" icon={<MessageSquareCode size={22} strokeWidth={1.25} />}>
          {protocol && ProtocolIcon ? (
            <div className="flex items-center gap-[0.31rem]">
              <ProtocolIcon />
              <span className="text-sm">{protocol.title}</span>
            </div>
          ) : null}
        </Card>

        <Card title="Message Payload" icon={<MessageSquareWarning size={22} strokeWidth={1.25} />}>
          <div className="w-full break-words rounded bg-background p-5">
            {data?.message?.payload}
          </div>
        </Card>

        <Card title="Message Params" icon={<MessageSquareQuote size={22} strokeWidth={1.25} />}>
          <div className="word-breal w-full break-words rounded bg-background p-5">
            {data?.message?.params}
          </div>
        </Card>

        <Card title="Source Dapp Address" icon={<LayoutGrid size={22} strokeWidth={1.25} />}>
          {data?.message?.sourceDappAddress}
        </Card>

        <Card title="Source Port Address" icon={<Unplug size={22} strokeWidth={1.25} />}>
          {data?.message?.sourcePortAddress}
        </Card>

        <Card title="Target Dapp Address" icon={<LayoutGrid size={22} strokeWidth={1.25} />}>
          {data?.message?.targetDappAddress}
        </Card>
        <Card title="Target Port Address" icon={<Unplug size={22} strokeWidth={1.25} />}>
          {data?.message?.targetPortAddress}
        </Card>

        <Card title="ORMP Info" icon={<OrmpIcon />}>
          <OrmpInfo />
        </Card>
      </div>
    </div>
  );
};

export default TxDetail;
