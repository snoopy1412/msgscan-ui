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
import OrmpIcon from '@/components/OrmpIcon';
import { useQuery } from '@tanstack/react-query';
import MessageStatus from '@/components/MessageStatus';
import OrmpInfo from './components/OrmpInfo';
import { useParams } from 'next/navigation';
import { fetchMessage } from '@/graphql/services';

function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => fetchMessage(id)
  });
}

const TxDetail = () => {
  const params = useParams();
  const { data, status, error, isFetching } = useMessage(params?.id as string);
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
          <div className="w-full break-words">{data?.message?.sourceTransactionHash}</div>
        </Card>

        <Card
          title="Target Transaction Hash"
          icon={<ArrowRightToLine size={22} strokeWidth={1.25} />}
        >
          {data?.message?.targetTransactionHash}
        </Card>

        <Card title="Messaging Protocol" icon={<MessageSquareCode size={22} strokeWidth={1.25} />}>
          {data?.message?.protocol}
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
