import { Button } from '@/components/ui/button';

import { MESSAGE_STATUS_LIST } from '@/config/status';
import { useCallback, useEffect, useState } from 'react';
import { CHAIN_OPTIONS } from '@/config/chains';
import TableChainFilter from './TableChainFilter';
import TableStatusFilter from './TableStatusFilter';
import TableDateFilter from './TableDateFilter';

import { DateRange } from 'react-day-picker';

export interface ToolbarProps {
  onChange: (filters: {
    status: (string | number)[];
    date: DateRange | undefined;
    sourceChains: (string | number)[];
    targetChains: (string | number)[];
  }) => void;
}
const Toolbar = ({ onChange }: ToolbarProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<(string | number)[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [selectedSourceChains, setSelectedSourceChains] = useState<(string | number)[]>([]);
  const [selectedTargetChains, setSelectedTargetChains] = useState<(string | number)[]>([]);

  const handleResetStatus = useCallback(() => {
    setSelectedStatuses([]);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedStatuses([]);
    setSelectedSourceChains([]);
    setSelectedTargetChains([]);
    setDate({ from: undefined, to: undefined });
  }, []);

  useEffect(() => {
    onChange?.({
      status: selectedStatuses,
      date,
      sourceChains: selectedSourceChains,
      targetChains: selectedTargetChains
    });
  }, [selectedStatuses, date, selectedSourceChains, selectedTargetChains, onChange]);

  return (
    <div className="flex items-center justify-between py-5">
      <div className="text-sm font-normal leading-[1.4rem] text-foreground">Messages</div>
      <div className="flex gap-3">
        <TableStatusFilter
          options={MESSAGE_STATUS_LIST}
          value={selectedStatuses}
          onChange={setSelectedStatuses}
          title="Status"
          onClearFilters={handleResetStatus}
        />

        <TableDateFilter onChange={setDate} date={date} />

        <TableChainFilter
          options={CHAIN_OPTIONS}
          value={selectedSourceChains}
          onChange={setSelectedSourceChains}
          title="Source"
          limit={6}
        />

        <TableChainFilter
          options={CHAIN_OPTIONS}
          value={selectedTargetChains}
          onChange={setSelectedTargetChains}
          title="Target"
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
export default Toolbar;
