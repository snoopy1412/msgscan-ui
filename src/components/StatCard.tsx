import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  percentageChange: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
}) => {
  return (
    <Card className="bg-transparent border-none py-5">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-sm text-secondary-foreground leading-[1.4rem] font-normal">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-[1.625rem] leading-[2.6rem] tracking-[0.0625rem]">
          {value}
        </div>
        <p className="text-xs text-muted-foreground">
          {percentageChange > 0
            ? `+${percentageChange}%`
            : `${percentageChange}%`}{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
};
