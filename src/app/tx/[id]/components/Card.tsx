import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  loading?: boolean;
}

const Card = ({ title, icon, loading, children }: React.PropsWithChildren<CardProps>) => {
  return (
    <div className="flex items-center gap-[0.62rem] rounded bg-card p-5">
      <div className="flex w-[14.12rem] items-center gap-[0.31rem] text-muted-foreground">
        {icon}
        <h3 className="w-[12.5rem] text-sm font-normal leading-6">{title}</h3>
      </div>
      <div className="w-[calc(100%-14.12rem)] text-sm font-normal leading-6 text-foreground">
        {loading ? <Skeleton className="h-[22px] w-1/2 rounded-full" /> : children}
      </div>
    </div>
  );
};
export default Card;
