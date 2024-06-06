import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const TableFilter = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-[0.31rem] border-none text-sm font-normal"
        >
          <span className="text-secondary-foreground">Status:</span>
          <span className="text-foreground">All</span>

          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={cn('transform transition-transform', open ? 'rotate-180' : 'rotate-0')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder={'11'} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem>
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon className={cn('h-4 w-4')} />
                </div>

                <span>{11}</span>
              </CommandItem>

              <CommandItem>
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary bg-primary text-primary-foreground'
                  )}
                >
                  <CheckIcon className={cn('h-4 w-4')} />
                </div>
                <span>{22}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TableFilter;
