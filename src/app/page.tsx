'use client';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MessageFullBoolExp, MessageFullQueryParams, OrderBy } from '@/graphql/type';
import { useShallow } from 'zustand/react/shallow';
import { produce } from 'immer';

import DataTable from './components/Table';
import { createTimestampQuery } from '@/utils';
import useFilterStore from '@/store/filter';
import SearchBar from '@/components/SearchBar';
import { useMessageFull, useMessageProgress } from '@/hooks/services';

import { Separator } from '@/components/ui/separator';
import StatsContainer from '@/components/StatsContainer';

export default function Page() {
  const queryClient = useQueryClient();

  const [queryVariables, setQueryVariables] = useState<MessageFullQueryParams>({
    offset: 0,
    limit: 10,
    orderBy: [
      {
        sourceBlockTimestamp: OrderBy.Desc
      }
    ]
  });

  const updateQueryVariables = (updates: Partial<MessageFullQueryParams>) => {
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
    const where: Partial<MessageFullBoolExp> = {};

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

    let params: MessageFullQueryParams = {
      where: Object.values(where).some((value) => value !== undefined) ? where : undefined
    };
    if (params.where) {
      params.offset = 0;
    }

    updateQueryVariables(params);
    queryClient.resetQueries({
      queryKey: ['messageFull']
    });
  }, [queryClient, selectedStatuses, date, selectedSourceChains, selectedTargetChains]);

  const { data, isFetching } = useMessageFull(queryVariables);

  const { data: messageProgress } = useMessageProgress();

  const handlePreviousPageClick = useCallback(() => {
    const offset = queryVariables?.offset;

    if (offset === undefined || offset < 1) return;

    updateQueryVariables({ offset: offset - 1 });
  }, [queryVariables]);

  const handleNextPageClick = useCallback(() => {
    const offset = queryVariables?.offset;
    if (offset === undefined) return;
    updateQueryVariables({ offset: offset + 1 });
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
        dataSource={Array.isArray(data?.MessageFull) ? data?.MessageFull : []}
        offset={queryVariables?.offset}
        onPreviousPageClick={handlePreviousPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </>
  );
}
