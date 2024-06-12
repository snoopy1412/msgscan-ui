import { Button } from '@/components/ui/button';

import { MESSAGE_STATUS_LIST } from '@/config/status';
import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CHAIN_OPTIONS } from '@/config/chains';
import TableChainFilter from './TableChainFilter';
import TableStatusFilter from './TableStatusFilter';
import TableDateFilter from './TableDateFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DateRange } from 'react-day-picker';
import { SlidersHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import useFilterStore from '@/store/filter';

export interface MobileTableFilterToolbarProps {
  className?: string;
}
const MobileTableFilterToolbar = ({ className }: MobileTableFilterToolbarProps) => {
  const [open, setOpen] = useState(false);
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

  const selectedNumber = useMemo(() => {
    const dateNumber = date?.from && date?.to ? 1 : 0;
    return (
      dateNumber +
      selectedStatuses?.length +
      selectedSourceChains?.length +
      selectedTargetChains?.length
    );
  }, [date, selectedStatuses, selectedSourceChains, selectedTargetChains]);

  return (
    <>
      <div className={cn('flex items-center justify-between', className)}>
        <div className="text-sm font-normal leading-[1.4rem] text-foreground">Messages</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-[0.31rem] border-none text-sm font-normal"
        >
          <SlidersHorizontal size={20} strokeWidth={1.25} className="text-secondary-foreground" />
          <span className="text-xs text-secondary-foreground">
            Filters {selectedNumber ? `(${selectedNumber})` : ''}
          </span>
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:w-full sm:max-w-full lg:w-[800px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start gap-3">
            <TableStatusFilter
              options={MESSAGE_STATUS_LIST}
              value={selectedStatuses}
              onChange={handleStatusChange}
              title="Status"
              onClearFilters={handleResetStatus}
              contentClassName="w-full"
              buttonClassName="justify-between w-full"
            />

            <TableDateFilter
              onChange={handleDateChange}
              date={date}
              contentClassName="w-full"
              buttonClassName="justify-between w-full"
            />

            <TableChainFilter
              options={CHAIN_OPTIONS}
              value={selectedSourceChains}
              onChange={handleSourceChainChange}
              title="Source"
              limit={6}
              contentClassName="w-full"
              buttonClassName="justify-between w-full"
            />

            <TableChainFilter
              options={CHAIN_OPTIONS}
              value={selectedTargetChains}
              onChange={handleTargetChainChange}
              title="Target"
              limit={6}
              contentClassName="w-full"
              buttonClassName="justify-between w-full"
            />
            <Separator className="block lg:hidden" />
            <Button
              variant="outline"
              size="sm"
              className="border-none text-sm font-normal text-secondary-foreground"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default MobileTableFilterToolbar;
