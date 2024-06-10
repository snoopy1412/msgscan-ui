import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface TableDateFilterProps {
  date?: DateRange;
  onChange?: (date: DateRange) => void;
}

const TableDateFilter = ({ date, onChange }: TableDateFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback<SelectRangeEventHandler>(
    (selectedDate) => {
      if (!selectedDate) return;
      const { from, to } = selectedDate;
      if (onChange) {
        onChange({
          from,
          to
        });
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!open && (!date?.from || !date?.to)) {
      if (onChange) {
        onChange({
          from: undefined,
          to: undefined
        });
      }
    }
  }, [open, onChange, date?.from, date?.to]);

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-[0.31rem] border-none text-sm font-normal"
        >
          <span className="text-secondary-foreground">Date:</span>
          <span className="text-sm text-foreground">
            {!date?.from && !date?.to
              ? 'All'
              : `${date.from?.toLocaleDateString() ?? ''} - ${date.to?.toLocaleDateString() ?? ''}`}
          </span>

          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={cn('transform transition-transform', open ? 'rotate-180' : 'rotate-0')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[35rem] p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          className="bg-card"
          onSelect={handleChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TableDateFilter;
