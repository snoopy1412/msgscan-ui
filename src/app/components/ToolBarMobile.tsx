import { Button } from '@/components/ui/button';

import { MESSAGE_STATUS_LIST } from '@/config/status';
import { useCallback, useEffect, useState } from 'react';
import { CHAIN_OPTIONS } from '@/config/chains';
import TableChainFilter from './TableChainFilter';
import TableStatusFilter from './TableStatusFilter';
import TableDateFilter from './TableDateFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DateRange } from 'react-day-picker';
import { SlidersHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ToolbarProps {
  className?: string;
  onChange: (filters: {
    status: (string | number)[];
    date: DateRange | undefined;
    sourceChains: (string | number)[];
    targetChains: (string | number)[];
  }) => void;
}
const ToolBarMobile = ({ onChange, className }: ToolbarProps) => {
  const [open, setOpen] = useState(false);
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
          <span className="text-secondary-foreground">Filters</span>
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:w-full sm:max-w-full lg:hidden">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start gap-3">
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
export default ToolBarMobile;
