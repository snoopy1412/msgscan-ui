'use client';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MessagePortBoolExp, MessagePortQueryParams, OrderBy } from '@/graphql/type';
import { useShallow } from 'zustand/react/shallow';
import { produce } from 'immer';

import DataTable from './components/Table';
import { createTimestampQuery } from '@/utils';
import useFilterStore from '@/store/filter';
import SearchBar from '@/components/SearchBar';
import { useMessagePort, useMessageProgress } from '@/hooks/services';

import { Separator } from '@/components/ui/separator';
import StatsContainer from '@/components/StatsContainer';
import { getChainsByNetwork } from '@/utils/network';

const defaultQueryVariables: MessagePortQueryParams = {
  offset: 0,
  limit: 10,
  orderBy: [
    {
      sourceBlockTimestamp: OrderBy.Desc
    }
  ]
};
interface PageProps {
  searchParams: {
    network: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  const chains = getChainsByNetwork(searchParams?.network);

  const queryClient = useQueryClient();

  const [queryVariables, setQueryVariables] =
    useState<MessagePortQueryParams>(defaultQueryVariables);

  const updateQueryVariables = (updates: Partial<MessagePortQueryParams>) => {
    setQueryVariables((prev) =>
      produce(prev, (draft) => {
        Object.assign(draft, updates);
      })
    );
  };
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

  useEffect(() => {
    const where: Partial<MessagePortBoolExp> = {};

    where.status =
      selectedStatuses && selectedStatuses?.length > 0
        ? {
            _in: selectedStatuses
          }
        : undefined;

    where.sourceChainId =
      selectedSourceChains && selectedSourceChains?.length > 0
        ? {
            _in: selectedSourceChains
          }
        : undefined;

    where.targetChainId =
      selectedTargetChains && selectedTargetChains?.length > 0
        ? {
            _in: selectedTargetChains
          }
        : undefined;

    if (date && (date?.from || date?.to)) {
      Object.assign(where, {
        sourceBlockTimestamp: createTimestampQuery(date)
      });
    } else {
      where.sourceBlockTimestamp = undefined;
    }

    let params: MessagePortQueryParams = {
      where: Object.values(where).some((value) => value !== undefined) ? where : undefined
    };
    if (params.where) {
      params.offset = 0;
    }

    updateQueryVariables(params);
    queryClient.resetQueries({
      queryKey: ['messagePort']
    });
  }, [queryClient, selectedStatuses, date, selectedSourceChains, selectedTargetChains]);

  const { data, isFetching } = useMessagePort(queryVariables, chains);

  const { data: messageProgress } = useMessageProgress();

  const handlePreviousPageClick = useCallback(() => {
    const offset = queryVariables?.offset;
    const limit = queryVariables?.limit || 10;
    if (offset === undefined) return;
    updateQueryVariables({ offset: Math.max(0, offset - limit) });
  }, [queryVariables]);

  const handleNextPageClick = useCallback(() => {
    const offset = queryVariables?.offset;
    const limit = queryVariables?.limit || 10;
    if (offset === undefined) return;
    updateQueryVariables({ offset: offset + limit });
  }, [queryVariables]);

  return (
    <>
      <div className="block lg:hidden">
        <SearchBar />
      </div>
      <div className="py-[2.5rem] lg:py-0">
        <StatsContainer
          data={
            Array.isArray(messageProgress?.MessageProgress) ? messageProgress?.MessageProgress : []
          }
        />
      </div>
      <Separator className="hidden lg:block" />
      <DataTable
        loading={isFetching}
        network={searchParams?.network}
        chains={chains}
        dataSource={Array.isArray(data?.MessagePort) ? data?.MessagePort : []}
        offset={queryVariables?.offset}
        onPreviousPageClick={handlePreviousPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </>
  );
}
