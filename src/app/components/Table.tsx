'use client';
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

interface TableProps {
  loading: boolean;
  dataSource: any[];
}
function formatTimeDifference(timestamp1, timestamp2) {
  const diff = timestamp2 - timestamp1;
  const minutes = Math.floor(diff / 60);
  return `${minutes} mins`;
}

// Helper function to format time as 'X mins ago'
function formatTimeAgo(timestamp) {
  const now = Math.floor(Date.now() / 1000); // current time in seconds
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60);
  return `${minutes} mins ago`;
}

// 定义Column
type Column = {
  dataIndex: string;
  title: string;
  width?: string;
  render: (value: any, record: any, index: number) => any;
};

const columns: Column[] = [
  {
    dataIndex: 'status',
    title: 'Status',
    width: '7.78rem',
    render(value, record, index) {
      return <MessageStatus status={value} />;
    }
  },
  {
    dataIndex: 'id',
    title: 'Msgid',
    width: '7.78rem',
    render(value, record, index) {
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
    render(value, record, index) {
      return value;
    }
  },
  {
    dataIndex: 'sourceTransactionHash',
    title: 'Source Tx Hash',
    width: '7.78rem',
    render(value, record, index) {
      return (
        <Link href={`/tx/${value}`} className="hover:underline">
          {value}
        </Link>
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
      return value;
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
    dataIndex: 'sourceBlockTimestamp',
    title: 'Age',
    width: '7.78rem',
    render(value, record, index) {
      return formatTimeAgo(value);
    }
  },
  {
    dataIndex: 'targetBlockTimestamp',
    title: 'TimeSpent',
    width: '7.78rem',
    render(value, record, index) {
      return formatTimeDifference(record.sourceBlockTimestamp, value);
    }
  }
];

const TableDemo = ({ loading, dataSource }: TableProps) => {
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
                  {column.render(message[column.dataIndex], message, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="justify-end gap-[0.31rem] py-5">
        <PaginationContent>
          <PaginationItem className="rounded bg-card">
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem className="rounded bg-card">
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default TableDemo;
