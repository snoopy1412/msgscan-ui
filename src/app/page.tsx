"use client";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { data } from "./data/tasks";
import StatsContainer from "@/components/StatsContainer";
import Data from "./Data";
import TableDemo from "./components/Table";
import { client } from "@/graphql/client";
import { GET_MESSAGES } from "@/graphql/queries";
import { useQuery } from "@tanstack/react-query";

function useMessages({
  limit = 10,
  orderBy = "sourceBlockTimestamp",
  orderDirection = "desc",
} = {}) {
  return useQuery({
    queryKey: ["messages", limit, orderBy, orderDirection],
    queryFn: async () => {
      const variables = { limit, orderBy, orderDirection };
      const data = await client.request(GET_MESSAGES, variables);
      return data;
    },
    placeholderData: true,
  });
}

export default function TaskPage() {
  const { data, status, error, isFetching } = useMessages();

  return (
    <>
      <StatsContainer />
      <Separator />
      <TableDemo
        loading={isFetching}
        dataSource={data?.messages?.items || []}
      />
      {/* 统计模块 */}
      {/* <div className=" gap-4 bg-white/50 p-20">
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
      <Data /> */}
    </>
  );
}
