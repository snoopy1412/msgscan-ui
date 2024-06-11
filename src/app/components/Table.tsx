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
import Toolbar, { ToolbarProps } from './ToolBar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Message, PageInfo } from '@/graphql/type';
import { columns } from '../data/columns';
import Spin from '@/components/ui/spin';
import { useCallback, useEffect, useState } from 'react';

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

interface TableProps {
  loading: boolean;
  dataSource: Message[];
}

interface TableProps {
  loading: boolean;
  onChangeFilter: ToolbarProps['onChange'];
  dataSource: Message[];
  pageInfo?: PageInfo;
  onPreviousPageClick: React.MouseEventHandler<HTMLLIElement>;
  onNextPageClick: React.MouseEventHandler<HTMLLIElement>;
}

const DataTable = ({
  loading,
  onChangeFilter,
  dataSource,
  pageInfo,
  onPreviousPageClick,
  onNextPageClick
}: TableProps) => {
  const [activePageType, setActivePageType] = useState<'previous' | 'next' | ''>('');

  const handlePreviousPageClick = useCallback<React.MouseEventHandler<HTMLLIElement>>(
    (e) => {
      setActivePageType('previous');
      onPreviousPageClick(e);
    },
    [onPreviousPageClick]
  );

  const handleNextPageClick = useCallback<React.MouseEventHandler<HTMLLIElement>>(
    (e) => {
      setActivePageType('next');
      onNextPageClick(e);
    },
    [onNextPageClick]
  );

  useEffect(() => {
    if (!loading) {
      setActivePageType('');
    }
  }, [loading]);

  return (
    <div className="relative">
      <Toolbar onChange={onChangeFilter} />
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
                  index === columns.length - 1 && 'pr-5'
                )}
                style={{ width: column.width ? column.width : '100px' }}
                key={column.dataIndex}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource?.length ? (
            dataSource.map((message) => (
              <TableRow
                key={message?.id}
                className="border-b-[2px] border-b-background bg-card last:border-b-0"
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={column.dataIndex}
                    className={cn(
                      'border-none',
                      'px-0',
                      'pr-[1.88rem]',
                      index === 0 && 'pl-5',
                      index === columns.length - 1 && 'pr-5',
                      index === 0 && 'rounded-[var(--radius)_0_0_var(--radius)]',
                      index === columns.length - 1 && 'rounded-[0_var(--radius)_var(--radius)_0]'
                    )}
                    style={{ width: column.width ? column.width : '100px' }}
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeInOut}
                      className="truncate"
                    >
                      {column.render((message as unknown as any)[column.dataIndex], message, index)}
                    </motion.div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-none bg-card px-5">
              <TableCell
                colSpan={columns.length}
                className="py-5 text-center text-muted-foreground"
              >
                Sorry, there&apos;s no data available with your current filters selection, please
                try a different one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {dataSource?.length ? (
        <Pagination className="justify-end gap-[0.31rem] py-5">
          <PaginationContent>
            <PaginationItem
              className="rounded bg-card"
              onClick={pageInfo?.hasPreviousPage ? handlePreviousPageClick : undefined}
            >
              <PaginationPrevious
                loading={loading && activePageType === 'previous'}
                className={cn(
                  pageInfo?.hasPreviousPage
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground'
                )}
              />
            </PaginationItem>
            <PaginationItem
              className="rounded bg-card"
              onClick={pageInfo?.hasNextPage ? handleNextPageClick : undefined}
            >
              <PaginationNext
                loading={loading && activePageType === 'next'}
                className={cn(
                  pageInfo?.hasNextPage
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
};

export default DataTable;
