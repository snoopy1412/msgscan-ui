import Image from "next/image";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { data } from "./data/tasks";
import StatsContainer from "@/components/StatsContainer";
import Data from "./Data";

export default async function TaskPage() {
  const tasks = data;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className=" gap-4 bg-white/50 p-20">
        <div className="size-20 bg-background">background</div>
        <div className="size-20 bg-foreground">foreground</div>

        <div className="size-20 bg-card">card</div>

        <div className="size-20 bg-card-foreground">card-foreground</div>

        <div className="size-20 bg-popover">popover</div>
        <div className="size-20 bg-popover-foreground">popover-foreground</div>
        <div className="size-20 bg-primary">primary</div>
        <div className="size-20 bg-primary-foreground">primary-foreground</div>
        <div className="size-20 bg-secondary">secondary</div>
        <div className="size-20 bg-secondary-foreground">
          secondary-foreground
        </div>
        <div className="size-20 bg-muted">muted</div>
        <div className="size-20 bg-muted-foreground">muted-foreground</div>
        <div className="size-20 bg-accent">accent</div>
        <div className="size-20 bg-accent-foreground">accent-foreground</div>
        <div className="size-20 bg-destructive">destructive</div>
        <div className="size-20 bg-[var(--input)]">--input</div>
      </div>
      <Data />
    </div>
  );
}
