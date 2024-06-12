import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertToNumber } from '@/utils';
import Counter from './Counter';
import { Separator } from './ui/separator';

interface StatCardProps {
  title: string;
  value?: number | string;
  percentageChange: number;
  hiddenBottomBorder?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  hiddenBottomBorder
}) => {
  const numberValue = convertToNumber(value);
  return (
    <Card className="border-none bg-transparent py-0 lg:py-5">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-[0.75rem] font-normal leading-[1.4rem] text-secondary-foreground lg:text-sm">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-0 lg:flex-col lg:items-start lg:justify-start">
        <div className="text-xl leading-[2rem] tracking-[0.0625rem] lg:text-[1.625rem] lg:leading-[2.6rem]">
          <Counter target={numberValue} />
        </div>
        <p className="text-xs text-muted-foreground">
          {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`} from last month
        </p>
      </CardContent>
      {<Separator className="block w-full lg:hidden" />}
    </Card>
  );
};
