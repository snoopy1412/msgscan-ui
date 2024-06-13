import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { TableFilterOption } from '@/types/helper';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import SelectedLabels from '@/components/SelectedLabels';

interface TableChainFilterProps {
  options: TableFilterOption[];
  value: (string | number)[];
  onChange: (newValue: (string | number)[]) => void;
  title: React.ReactNode;
  limit: number;
  buttonClassName?: string;
  contentClassName?: string;
}

const TableChainFilter = ({
  options,
  value,
  onChange,
  title,
  limit,
  buttonClassName,
  contentClassName
}: TableChainFilterProps) => {
  const [open, setOpen] = useState(false);

  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => (a?.label as string)?.localeCompare(b.label as string));
  }, [options]);

  const toggleItem = (itemValue: string | number) => {
    if (value.length >= limit && !value.includes(itemValue)) {
      return;
    }
    if (value.includes(itemValue)) {
      onChange(value.filter((s) => s !== itemValue));
    } else {
      onChange([...value, itemValue]);
    }
  };

  const handleSelectAll = () => {
    if (value.length === limit) {
      onChange([]);
    } else {
      const newValue = new Set(value);
      for (const option of sortedOptions) {
        if (newValue.size >= limit) break;
        newValue.add(option.value);
      }
      onChange(Array.from(newValue));
    }
  };

  const checkedAll = useMemo(() => {
    if (value.length === limit) return true;
    if (value.length !== 0) return 'indeterminate';
    return false;
  }, [value, limit]);

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'flex items-center gap-[0.31rem] border-none text-sm font-normal',
            buttonClassName
          )}
        >
          <span className="text-secondary-foreground">{title}:</span>
          <div className="flex items-center gap-[0.31rem]">
            <SelectedLabels options={options} value={value} />
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className={cn('transform transition-transform', open ? 'rotate-180' : 'rotate-0')}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0 text-xs text-secondary-foreground', contentClassName)}
        align="end"
      >
        <div className="flex items-center justify-between px-[1.25rem] py-[0.62rem]">
          <div className="flex items-center gap-[0.62rem]" onClick={handleSelectAll}>
            <Checkbox checked={checkedAll}></Checkbox>
            <label
              className={cn(
                'cursor-pointer',
                checkedAll ? 'text-foreground' : 'text-secondary-foreground'
              )}
            >
              All
            </label>
          </div>
          <span>
            {value.length || '0'} / {limit} Selected
          </span>
        </div>
        <Separator />
        <div className="flex flex-col px-[1.25rem] lg:grid lg:grid-cols-3">
          {sortedOptions.map(({ value: optionValue, label }) => {
            const isSelected = value.includes(optionValue);
            return (
              <div
                key={optionValue}
                onClick={() => toggleItem(optionValue)}
                className={cn(
                  'flex items-center gap-[0.62rem] py-[0.62rem]',
                  value.length < limit || isSelected ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={value.length === limit && !isSelected}
                ></Checkbox>
                <label
                  className={cn(
                    'cursor-pointer',
                    isSelected ? 'text-foreground' : 'text-secondary-foreground'
                  )}
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableChainFilter;
