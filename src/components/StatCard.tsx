import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { convertToNumber } from '@/utils';
import Counter from './Counter';

interface StatCardProps {
  title: string;
  value?: number | string;
  percentageChange: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, percentageChange }) => {
  const numberValue = convertToNumber(value);
  return (
    <Card className="border-none bg-transparent py-5">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-sm font-normal leading-[1.4rem] text-secondary-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-[1.625rem] leading-[2.6rem] tracking-[0.0625rem]">
          <Counter target={numberValue} />
        </div>
        <p className="text-xs text-muted-foreground">
          {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`} from last month
        </p>
      </CardContent>
    </Card>
  );
};
