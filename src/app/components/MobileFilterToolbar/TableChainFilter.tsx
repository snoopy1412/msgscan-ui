import { cn } from '@/lib/utils';
import { TableFilterOption } from '@/types/helper';
import { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface TableChainFilterProps {
  options: TableFilterOption[];
  value: (string | number)[];
  onChange: (newValue: (string | number)[]) => void;
  limit: number;
}

const TableChainFilter = ({ options, value, onChange, limit }: TableChainFilterProps) => {
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
    <div className="absolute left-0 top-0 w-[calc(100vw-3rem)] bg-background">
      <div className="flex items-center justify-between py-[0.62rem]">
        <div className="flex items-center gap-[0.62rem]" onClick={handleSelectAll}>
          <Checkbox checked={checkedAll}></Checkbox>
          <label
            className={cn(
              'text-sm',
              'cursor-pointer',
              checkedAll ? 'text-foreground' : 'text-secondary-foreground'
            )}
          >
            All
          </label>
        </div>
        <span className="text-sm text-secondary-foreground">
          {value.length || '0'} / {limit} Selected
        </span>
      </div>
      <Separator />
      <div className="flex flex-col">
        {sortedOptions.map(({ value: optionValue, label }) => {
          const isSelected = value.includes(optionValue);
          return (
            <div
              key={optionValue}
              onClick={() => toggleItem(optionValue)}
              className={cn(
                'flex h-[3.125rem] items-center gap-[0.62rem]',
                value.length < limit || isSelected ? 'cursor-pointer' : 'cursor-not-allowed'
              )}
            >
              <Checkbox
                checked={isSelected}
                disabled={value.length === limit && !isSelected}
              ></Checkbox>
              <label
                className={cn(
                  'text-sm',
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
    </div>
  );
};

export default TableChainFilter;
