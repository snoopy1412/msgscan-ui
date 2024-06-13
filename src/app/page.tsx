'use client';
import { Separator } from '@/components/ui/separator';

import StatsContainer from '@/components/StatsContainer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, fetchMessagesInfos } from '@/graphql/services';
import { MessagesQueryVariables } from '@/graphql/type';
import { useShallow } from 'zustand/react/shallow';

import DataTable from './components/Table';
import { useCallback, useEffect, useState } from 'react';
import { createTimestampQuery } from '@/utils';
import useFilterStore from '@/store/filter';
import { REFRESH_INTERVAL } from '@/config/site';
import SearchBar from '@/components/SearchBar';

function useMessages(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messages', variables],
    queryFn: async () => fetchMessages(variables),
    refetchInterval: REFRESH_INTERVAL,
    placeholderData(prevData) {
      const hasRealData = prevData?.messages?.items.some((item) => item.status !== -1);
      return hasRealData
        ? prevData
        : {
            messages: {
              items: Array.from({ length: variables.limit || 10 }).map((_, index) => ({
                id: index.toString(),
                protocol: 'eth',
                status: -1
              })),
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: undefined,
                endCursor: undefined
              }
            }
          };
    }
  });
}

function useMessagesInfos(variables: MessagesQueryVariables = {}) {
  return useQuery({
    queryKey: ['messagesInfos', variables],
    queryFn: async () => fetchMessagesInfos(variables),
    refetchInterval: REFRESH_INTERVAL
  });
}

export default function Page() {
  const [queryVariables, setQueryVariables] = useState<MessagesQueryVariables>({
    limit: 10,
    orderBy: 'sourceBlockTimestamp',
    orderDirection: 'desc'
  });
  const { selectedStatuses, date, selectedSourceChains, selectedTargetChains } = useFilterStore(
    useShallow((state) => {
      return {
        selectedStatuses: state.selectedStatuses,
        date: state.date,
        selectedSourceChains: state.selectedSourceChains,
        selectedTargetChains: state.selectedTargetChains
      };
    })
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    const where: any = {};

    where.status_in =
      selectedStatuses && selectedStatuses?.length > 0 ? selectedStatuses : undefined;

    where.sourceChainId_in =
      selectedSourceChains && selectedSourceChains?.length > 0 ? selectedSourceChains : undefined;

    where.targetChainId_in =
      selectedTargetChains && selectedTargetChains?.length > 0 ? selectedTargetChains : undefined;

    if (date && (date?.from || date?.to)) {
      Object.assign(where, createTimestampQuery(date));
    } else {
      where.sourceBlockTimestamp_gte = undefined;
      where.sourceBlockTimestamp_lte = undefined;
    }

    let params: MessagesQueryVariables = {
      where: Object.keys(where).some((key) => where[key] !== undefined) ? where : undefined
    };
    if (params.where) {
      params.after = undefined;
      params.before = undefined;
    }

    updateQueryVariables(params);
    queryClient.resetQueries({
      queryKey: ['messages']
    });
  }, [queryClient, selectedStatuses, date, selectedSourceChains, selectedTargetChains]);

  const updateQueryVariables = (updates: Partial<MessagesQueryVariables>) => {
    setQueryVariables((prev) => ({ ...prev, ...updates }));
  };

  const { data, isFetching } = useMessages(queryVariables);

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
      <div className="block lg:hidden">
        <SearchBar />
      </div>
      <div className="py-[2.5rem] lg:py-0">
        <StatsContainer data={messagesInfos?.messagesInfos?.items} />
      </div>
      <Separator className="hidden lg:block" />
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
