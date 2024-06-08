import { Button } from '@/components/ui/button';

import TableFilter from './TableFilter';

const Toolbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="text-sm font-normal leading-[1.4rem] text-foreground">Messages</div>
      <div className="flex gap-3">
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
