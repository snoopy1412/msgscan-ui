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
import { client } from '@/graphql/client';
import { GET_MESSAGE } from '@/graphql/queries';
import MessageStatus from '@/components/MessageStatus';
import OrmpInfo from './components/OrmpInfo';

function useMessage({ id } = {}) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: async () => {
      const variables = { id };
      const data = await client.request(GET_MESSAGE, variables);
      return data?.message || null;
    },
    placeholderData: true
  });
}

const TxDetail = () => {
  const { data, status, error, isFetching } = useMessage({
    id: '0xcefa17576ca7d29216ab18e0d46c93a3a48221f13b5950cfac5ab0ecbdf8f694'
  });

  return (
    <div>
      <header className="my-5 text-xl font-light leading-8 text-foreground">
        Transaction Details
      </header>
      <div className="flex flex-col gap-[0.12rem]">
        <Card title="MsgId" icon={<SquareUser size={22} strokeWidth={1.25} />}>
          <div className="w-full break-words">{data?.id}</div>
        </Card>

        <Card title="Status" icon={<PackageSearch size={22} strokeWidth={1.25} />}>
          <MessageStatus status={data?.status} />
        </Card>

        <Card
          title="Source Transaction Hash"
          icon={<ArrowRightFromLine size={22} strokeWidth={1.25} />}
        >
          <div className="w-full break-words">{data?.sourceTransactionHash}</div>
        </Card>

        <Card
          title="Target Transaction Hash"
          icon={<ArrowRightToLine size={22} strokeWidth={1.25} />}
        >
          {data?.targetTransactionHash}
        </Card>

        <Card title="Messaging Protocol" icon={<MessageSquareCode size={22} strokeWidth={1.25} />}>
          {data?.protocol}
        </Card>

        <Card title="Message Payload" icon={<MessageSquareWarning size={22} strokeWidth={1.25} />}>
          <div className="w-full break-words rounded bg-background p-5">{data?.payload}</div>
        </Card>

        <Card title="Message Params" icon={<MessageSquareQuote size={22} strokeWidth={1.25} />}>
          <div className="word-breal w-full break-words rounded bg-background p-5">
            {data?.params}
          </div>
        </Card>

        <Card title="Source Dapp Address" icon={<LayoutGrid size={22} strokeWidth={1.25} />}>
          {data?.sourceDappAddress}
        </Card>

        <Card title="Source Port Address" icon={<Unplug size={22} strokeWidth={1.25} />}>
          {data?.sourcePortAddress}
        </Card>

        <Card title="Target Dapp Address" icon={<LayoutGrid size={22} strokeWidth={1.25} />}>
          {data?.targetDappAddress}
        </Card>
        <Card title="Target Port Address" icon={<Unplug size={22} strokeWidth={1.25} />}>
          {data?.targetPortAddress}
        </Card>

        <Card title="ORMP Info" icon={<OrmpIcon />}>
          <OrmpInfo />
        </Card>
      </div>
    </div>
  );
};

export default TxDetail;
