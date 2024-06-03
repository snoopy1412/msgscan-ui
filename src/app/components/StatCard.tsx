import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  percentageChange: number;
  IconComponent: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  IconComponent,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
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
