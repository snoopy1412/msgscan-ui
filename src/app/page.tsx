'use client';
import { Separator } from '@/components/ui/separator';

import StatsContainer from '@/components/StatsContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages, fetchMessagesInfos } from '@/graphql/services';
import { MessagesQueryVariables } from '@/graphql/type';

import DataTable from './components/Table';
import { useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ToolbarProps } from './components/ToolBar';
import { createTimestampQuery } from '@/utils';

interface Filters {
  status: (string | number)[];
  date?: DateRange;
  sourceChains: (string | number)[];
  targetChains: (string | number)[];
}

function useMessages(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messages', variables],
    queryFn: async () => fetchMessages(variables),
    refetchInterval: 5000,
    placeholderData(prevData) {
      return prevData;
    }
  });
}

function useMessagesInfos(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messagesInfos', variables],
    queryFn: async () => fetchMessagesInfos(variables)
  });
}

export default function Page() {
  const [filters, setFilters] = useState<Filters>({
    status: [],
    date: { from: undefined, to: undefined },
    sourceChains: [],
    targetChains: []
  });

  const handleChangeFilters = useCallback<ToolbarProps['onChange']>((filters) => {
    const where: any = {};

    where.status_in = filters.status && filters.status.length > 0 ? filters.status : undefined;

    where.sourceChainId_in =
      filters.sourceChains && filters.sourceChains.length > 0 ? filters.sourceChains : undefined;

    where.targetChainId_in =
      filters.targetChains && filters.targetChains.length > 0 ? filters.targetChains : undefined;

    if (filters.date && (filters.date.from || filters.date.to)) {
      Object.assign(where, createTimestampQuery(filters.date));
    } else {
      where.sourceBlockTimestamp_gte = undefined;
      where.sourceBlockTimestamp_lte = undefined;
    }

    updateQueryVariables({
      where: Object.keys(where).some((key) => where[key] !== undefined) ? where : undefined
    });

    setFilters(filters);
  }, []);

  const [queryVariables, setQueryVariables] = useState<MessagesQueryVariables>({
    limit: 10,
    orderBy: 'sourceBlockTimestamp',
    orderDirection: 'desc'
  });

  const updateQueryVariables = (updates: Partial<MessagesQueryVariables>) => {
    setQueryVariables((prev) => ({ ...prev, ...updates }));
  };

  const { data, status, error, isFetching, isRefetching, isPending } = useMessages(queryVariables);

  const { data: messagesInfos } = useMessagesInfos();

  const handlePreviousPageClick = useCallback(() => {
    const pageInfo = data?.messages?.pageInfo;
    updateQueryVariables({ before: pageInfo?.startCursor, after: undefined });
  }, [data?.messages?.pageInfo]);

  const handleNextPageClick = useCallback(() => {
    const pageInfo = data?.messages?.pageInfo;
    updateQueryVariables({ after: pageInfo?.endCursor, before: undefined });
  }, [data?.messages?.pageInfo]);

  return (
    <>
      <StatsContainer data={messagesInfos?.messagesInfos?.items} />
      <Separator />
      <DataTable
        loading={isFetching}
        onChangeFilter={handleChangeFilters}
        dataSource={data?.messages?.items || []}
        pageInfo={data?.messages?.pageInfo}
        onPreviousPageClick={handlePreviousPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </>
  );
}
