import { Calendar } from '@/components/ui/calendar';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { useCallback, useEffect } from 'react';

interface TableDateFilterProps {
  date?: DateRange;
  onChange?: (date: DateRange) => void;
}

const TableDateFilter = ({ date, onChange }: TableDateFilterProps) => {
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

  // useEffect(() => {
  //   if (!date?.from || !date?.to) {
  //     if (onChange) {
  //       onChange({
  //         from: undefined,
  //         to: undefined
  //       });
  //     }
  //   }
  // }, [onChange, date?.from, date?.to]);
  console.log('selectedDate', date);

  return (
    <div className="absolute left-0 top-0 w-[calc(100vw-3rem)] bg-background">
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        className="bg-card"
        onSelect={handleChange}
        numberOfMonths={2}
      />
    </div>
  );
};

export default TableDateFilter;
