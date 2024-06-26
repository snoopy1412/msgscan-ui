'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrmpMessageAccepted } from '@/hooks/services';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface OrmpInfoProps {
  id: string;
}

const OrmpInfo = ({ id }: OrmpInfoProps) => {
  const { data: ormpInfo, isPending } = useOrmpMessageAccepted(id as string);
  const info = ormpInfo?.ORMP_MessageAccepted?.[0];

  const data = useMemo(() => {
    return [
      {
        title: 'msgHash',
        value: info?.msgHash || '-'
      },
      {
        title: 'index',
        value: info?.index || '-'
      },
      {
        title: 'gaslimit',
        value: info?.gasLimit || '-'
      },
      {
        title: 'playload',
        value: info?.encoded || '-'
      },
      {
        title: 'channel',
        value: info?.channel || '-'
      }
    ];
  }, [info]);

  return (
    <div className="bg-background">
      {data?.map((item, index) => (
        <div className={cn('flex items-center', 'border-b border-b-muted')} key={index}>
          <div className="w-[7.5rem] shrink-0 border-r border-r-muted p-5 text-xs text-muted-foreground">
            {item?.title}
          </div>
          <div className="flex-1 truncate p-5 text-xs text-foreground">
            {isPending ? <Skeleton className="h-5 w-full rounded" /> : item?.value}
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrmpInfo;
