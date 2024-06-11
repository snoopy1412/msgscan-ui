'use client';

import MessageStatus from '@/components/MessageStatus';
import Link from 'next/link';
import { Message } from '@/graphql/type';
import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { protocols } from '@/config/protocols';
import { formatTimeAgo, formatTimeDifference } from '@/utils';

import ChainTxDisplay from '@/components/ChainTxDisplay';
import BlockchainAddressLink from '@/components/BlockchainAddressLink';
import { Skeleton } from '@/components/ui/skeleton';

export type Column = {
  dataIndex: string;
  title: string;
  width?: string;
  render: (value: any, record: Message, index: number) => any;
};

export const columns: Column[] = [
  {
    dataIndex: 'status',
    title: 'Status',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      return <MessageStatus status={value} />;
    }
  },
  {
    dataIndex: 'id',
    title: 'Msgid',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      return (
        <Link href={`/tx/${value}`} className="hover:underline" title={value}>
          {value}
        </Link>
      );
    }
  },
  {
    dataIndex: 'protocol',
    title: 'Protocol',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      const protocol = protocols?.find((protocol) => protocol.value === value);
      if (protocol) {
        const Icon = protocol.icon;
        return (
          <div className="flex items-center gap-[0.31rem]">
            <Icon />
            <span className="text-sm">{protocol.title}</span>
          </div>
        );
      }
    }
  },
  {
    dataIndex: 'sourceTransactionHash',
    title: 'Source Tx Hash',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.sourceChainId) as unknown as ChAIN_ID)
      );
      return <ChainTxDisplay chain={chain} value={value} isLink />;
    }
  },
  {
    dataIndex: 'sourceDappAddress',
    title: 'From',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.sourceChainId) as unknown as ChAIN_ID)
      );
      return <BlockchainAddressLink chain={chain} address={value} />;
    }
  },
  {
    dataIndex: 'targetTransactionHash',
    title: 'Target Tx Hash',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.targetChainId) as unknown as ChAIN_ID)
      );
      return <ChainTxDisplay chain={chain} value={value} isLink />;
    }
  },
  {
    dataIndex: 'targetDappAddress',
    title: 'To',
    width: '7.78rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.targetChainId) as unknown as ChAIN_ID)
      );
      return <BlockchainAddressLink chain={chain} address={value} />;
    }
  },
  {
    dataIndex: 'age',
    title: 'Age',
    width: '5rem',
    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      return record?.sourceBlockTimestamp ? formatTimeAgo(record?.sourceBlockTimestamp) : '';
    }
  },
  {
    dataIndex: 'timeSpent',
    title: 'TimeSpent',
    width: '5rem',

    render(value, record) {
      if (record?.status === -1) {
        return <Skeleton className="h-[22px] w-full rounded-full" />;
      }
      return record.sourceBlockTimestamp && record?.targetBlockTimestamp
        ? formatTimeDifference(record.sourceBlockTimestamp, record?.targetBlockTimestamp)
        : '';
    }
  }
];
