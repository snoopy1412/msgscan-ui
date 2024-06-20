'use client';
import { useOrmpInfo } from '@/hooks/services';
import { cn } from '@/lib/utils';

interface OrmpInfoProps {
  id: string;
}

const OrmpInfo = ({ id }: OrmpInfoProps) => {
  const { data: ormpInfo } = useOrmpInfo(id as string);

  const data = [
    {
      title: 'msgHash',
      value: '0x04017e6c4bb3fdd5062a98ef9f22ac4d6b229e3f0f242adf514b1d4d09711cb4'
    },
    {
      title: 'index',
      value: '95'
    },
    {
      title: 'gaslimit',
      value: '0x04017e6c4bb3fdd5062a98ef9f22ac4d6b229e3f0f242adf514b1d4d09711cb4'
    },
    {
      title: 'playload',
      value: '911131'
    },
    {
      title: 'channel',
      value: '0x9aca39c9f6d07017aba5762fadab46b91be2fc5029f3d8c982e4c5ca0b390a76'
    }
  ];

  return (
    <div className="bg-background">
      {data?.map((item, index) => (
        <div className={cn('flex items-center', 'border-b border-b-muted')} key={index}>
          <div className="w-[7.5rem] shrink-0 border-r border-r-muted p-5 text-xs text-muted-foreground">
            {item?.title}
          </div>
          <div className="flex-1 truncate p-5 text-xs text-foreground">{item?.value}</div>
        </div>
      ))}
    </div>
  );
};
export default OrmpInfo;
