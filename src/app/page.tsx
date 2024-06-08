'use client';
import { Separator } from '@/components/ui/separator';

import StatsContainer from '@/components/StatsContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages, fetchMessagesInfos } from '@/graphql/services';
import { MessagesQueryVariables } from '@/graphql/type';

import DataTable from './components/Table';
import { useCallback, useState } from 'react';

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
  const [queryVariables, setQueryVariables] = useState<MessagesQueryVariables>({
    limit: 10,
    orderBy: 'sourceBlockTimestamp',
    orderDirection: 'desc'
  });

  const updateQueryVariables = (updates: Partial<MessagesQueryVariables>) => {
    setQueryVariables((prev) => ({ ...prev, ...updates }));
  };
  const { data, status, error, isFetching } = useMessages(queryVariables);

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
        dataSource={data?.messages?.items || []}
        pageInfo={data?.messages?.pageInfo}
        onPreviousPageClick={handlePreviousPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </>
  );
}
