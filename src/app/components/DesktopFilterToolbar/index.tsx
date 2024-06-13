import { Button } from '@/components/ui/button';

import { MESSAGE_STATUS_LIST } from '@/config/status';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CHAIN_OPTIONS } from '@/config/chains';
import TableChainFilter from './TableChainFilter';
import TableStatusFilter from './TableStatusFilter';
import TableDateFilter from './TableDateFilter';

import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import useFilterStore from '@/store/filter';

export interface TableFilterToolbarProps {
  className?: string;
}
const TableFilterToolbar = ({ className }: TableFilterToolbarProps) => {
  const {
    selectedStatuses,
    date,
    selectedSourceChains,
    selectedTargetChains,
    setSelectedStatuses,
    setDate,
    setSelectedSourceChains,
    setSelectedTargetChains
  } = useFilterStore(
    useShallow((state) => {
      return {
        selectedStatuses: state.selectedStatuses,
        date: state.date,
        selectedSourceChains: state.selectedSourceChains,
        selectedTargetChains: state.selectedTargetChains,
        setSelectedStatuses: state.setSelectedStatuses,
        setDate: state.setDate,
        setSelectedSourceChains: state.setSelectedSourceChains,
        setSelectedTargetChains: state.setSelectedTargetChains
      };
    })
  );

  const handleStatusChange = useCallback(
    (newStatuses: (string | number)[]) => {
      setSelectedStatuses(newStatuses);
    },
    [setSelectedStatuses]
  );

  const handleDateChange = useCallback(
    (newDate: DateRange) => {
      setDate(newDate);
    },
    [setDate]
  );

  const handleSourceChainChange = useCallback(
    (newSourceChains: (string | number)[]) => {
      setSelectedSourceChains(newSourceChains);
    },
    [setSelectedSourceChains]
  );

  const handleTargetChainChange = useCallback(
    (newTargetChains: (string | number)[]) => {
      setSelectedTargetChains(newTargetChains);
    },
    [setSelectedTargetChains]
  );

  const handleResetStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, [setSelectedStatuses]);

  const handleReset = useCallback(() => {
    setSelectedStatuses([]);
    setSelectedSourceChains([]);
    setSelectedTargetChains([]);
    setDate({ from: undefined, to: undefined });
  }, [setDate, setSelectedSourceChains, setSelectedStatuses, setSelectedTargetChains]);

  return (
    <div className={cn('flex items-center justify-between py-5', className)}>
      <div className="text-sm font-normal leading-[1.4rem] text-foreground">Messages</div>
      <div className="flex gap-3">
        <TableStatusFilter
          options={MESSAGE_STATUS_LIST}
          value={selectedStatuses}
          onChange={handleStatusChange}
          title="Status"
          onClearFilters={handleResetStatus}
          contentClassName="w-[10rem]"
        />

        <TableDateFilter onChange={handleDateChange} date={date} contentClassName="w-[35rem]" />

        <TableChainFilter
          options={CHAIN_OPTIONS}
          value={selectedSourceChains}
          onChange={handleSourceChainChange}
          title="Source"
          limit={6}
        />

        <TableChainFilter
          options={CHAIN_OPTIONS}
          value={selectedTargetChains}
          onChange={handleTargetChainChange}
          title="Target"
          contentClassName="w-[28rem]"
          limit={6}
        />

        <Button
          variant="outline"
          size="sm"
          className="border-none text-sm font-normal text-secondary-foreground"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
export default TableFilterToolbar;
