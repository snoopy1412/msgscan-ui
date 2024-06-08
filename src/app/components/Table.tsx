'use client';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import Toolbar from './ToolBar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import MessageStatus from '@/components/MessageStatus';
import Link from 'next/link';
import { Message, PageInfo } from '@/graphql/type';
import { chains } from '@/config/chains';
import { ChAIN_ID } from '@/types/chains';
import { protocols } from '@/config/protocols';
import { formatTimeAgo, formatTimeDifference } from '@/utils';

interface TableProps {
  loading: boolean;
  dataSource: Message[];
}

type Column = {
  dataIndex: string;
  title: string;
  width?: string;
  render: (value: any, record: Message, index: number) => any;
};

const columns: Column[] = [
  {
    dataIndex: 'status',
    title: 'Status',
    width: '7.78rem',
    render(value) {
      return <MessageStatus status={value} />;
    }
  },
  {
    dataIndex: 'id',
    title: 'Msgid',
    width: '7.78rem',
    render(value) {
      return (
        <Link href={`/tx/${value}`} className="hover:underline">
          {value}
        </Link>
      );
    }
  },
  {
    dataIndex: 'protocol',
    title: 'Protocol',
    width: '7.78rem',
    render(value) {
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
    render(value, record, index) {
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.sourceChainId) as unknown as ChAIN_ID)
      );
      return (
        <div className="flex items-center">
          {chain ? (
            <Image
              width={20}
              height={20}
              alt=""
              src={chain.iconUrl}
              className="mr-[0.31rem] rounded-full"
            ></Image>
          ) : null}
          <Link href={`/tx/${value}`} className="truncate hover:underline">
            {value}
          </Link>
        </div>
      );
    }
  },
  {
    dataIndex: 'sourceDappAddress',
    title: 'From',
    width: '7.78rem',
    render(value, record, index) {
      return value;
    }
  },
  {
    dataIndex: 'targetTransactionHash',
    title: 'Target Tx Hash',
    width: '7.78rem',
    render(value, record, index) {
      if (!value) return '';
      const chain = chains?.find(
        (chain) => chain.id === (Number(record?.targetChainId) as unknown as ChAIN_ID)
      );
      return (
        <div className="flex items-center">
          {chain ? (
            <Image
              width={20}
              height={20}
              alt=""
              src={chain.iconUrl}
              className="mr-[0.31rem] rounded-full"
            ></Image>
          ) : null}
          <span className="truncate">{value}</span>
        </div>
      );
    }
  },
  {
    dataIndex: 'targetDappAddress',
    title: 'To',
    width: '7.78rem',
    render(value, record, index) {
      return value;
    }
  },
  {
    dataIndex: 'age',
    title: 'Age',
    width: '7.78rem',
    render(value, record, index) {
      return record?.sourceBlockTimestamp ? formatTimeAgo(record?.sourceBlockTimestamp) : '';
    }
  },
  {
    dataIndex: 'timeSpent',
    title: 'TimeSpent',
    width: '7.78rem',
    render(value, record, index) {
      return record.sourceBlockTimestamp && record?.targetBlockTimestamp
        ? formatTimeDifference(record.sourceBlockTimestamp, record?.targetBlockTimestamp)
        : '';
    }
  }
];

interface TableProps {
  loading: boolean;
  dataSource: Message[];
  pageInfo?: PageInfo;
  onPreviousPageClick: React.MouseEventHandler<HTMLLIElement>;
  onNextPageClick: React.MouseEventHandler<HTMLLIElement>;
}

const DataTable = ({
  loading,
  dataSource,
  pageInfo,
  onPreviousPageClick,
  onNextPageClick
}: TableProps) => {
  console.log('dataSource', dataSource);
  return (
    <>
      <Toolbar />
      <Separator />
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="border-none px-5">
            {columns.map((column, index) => (
              <TableHead
                className={cn(
                  'h-14',
                  'px-0',
                  'pr-[1.88rem]',
                  index === 0 && 'pl-5',
                  index === columns.length - 1 && 'pr-5',
                  column.width ? column.width : 'w-[100px]'
                )}
                key={column.dataIndex}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource.map((message) => (
            <TableRow
              key={message?.id}
              className="border-b-[2px] border-b-background bg-card last:border-b-0"
            >
              {columns.map((column, index) => (
                <TableCell
                  key={column.dataIndex}
                  className={cn(
                    'border-none',
                    'truncate',
                    'px-0',
                    'pr-[1.88rem]',
                    index === 0 && 'pl-5',
                    index === columns.length - 1 && 'pr-5',
                    index === 0 && 'rounded-[var(--radius)_0_0_var(--radius)]',
                    index === columns.length - 1 && 'rounded-[0_var(--radius)_var(--radius)_0]',
                    column.width ? column.width : 'w-[100px]'
                  )}
                >
                  {column.render((message as unknown as any)[column.dataIndex], message, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="justify-end gap-[0.31rem] py-5">
        <PaginationContent>
          <PaginationItem
            className="rounded bg-card"
            onClick={pageInfo?.hasPreviousPage ? onPreviousPageClick : undefined}
          >
            <PaginationPrevious
              className={cn(
                pageInfo?.hasPreviousPage
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground'
              )}
            />
          </PaginationItem>
          <PaginationItem
            className="rounded bg-card"
            onClick={pageInfo?.hasNextPage ? onNextPageClick : undefined}
          >
            <PaginationNext
              className={cn(
                pageInfo?.hasNextPage
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground'
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default DataTable;
