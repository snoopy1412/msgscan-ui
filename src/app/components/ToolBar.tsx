import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ChevronDown } from 'lucide-react';
import TableFilter from './TableFilter';

const Toolbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="text-sm font-normal leading-[1.4rem] text-foreground">Messages</div>
      <div>
        <TableFilter />
        <TableFilter />
        <TableFilter />
        <TableFilter />
        <TableFilter />
        <Button
          variant="outline"
          size="sm"
          className="border-none text-sm font-normal text-secondary-foreground"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
export default Toolbar;
