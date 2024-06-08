import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { STATUS_MAP } from '@/config/status';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const TableFilter = () => {
  const [open, setOpen] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    console.log('status', status);

    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-[0.31rem] border-none text-sm font-normal"
        >
          <span className="text-secondary-foreground">Status:</span>
          <span className="text-foreground">
            {selectedStatuses.length > 0
              ? selectedStatuses.map((s) => STATUS_MAP[s].title).join(', ')
              : 'All'}
          </span>

          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={cn('transform transition-transform', open ? 'rotate-180' : 'rotate-0')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(STATUS_MAP).map(([key, value]) => {
                const isSelected = selectedStatuses.includes(key);
                return (
                  <CommandItem key={key} onSelect={() => toggleStatus(key)}>
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground [&_svg]:visible'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4', isSelected ? 'visible' : 'invisible')} />
                    </div>
                    <span>{value.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TableFilter;
