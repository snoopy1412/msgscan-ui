"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "../data/schema";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "msgid",
    header: "MsgId",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("msgid")}</div>,
  },
  {
    accessorKey: "Protocol",
    header: "Protocol",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Protocol")}</div>
    ),
  },
  {
    accessorKey: "sourceTxHash",
    header: "Source Tx Hash",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("sourceTxHash")}</div>
    ),
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("From")}</div>,
  },
  {
    accessorKey: "targetTxHash",
    header: "Target Tx Hash",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("targetTxHash")}</div>
    ),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("to")}</div>,
  },
  {
    accessorKey: "Age",
    header: "Age",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "TimeSpent",
    header: "TimeSpent",
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("TimeSpent")}</div>
    ),
  },
];
