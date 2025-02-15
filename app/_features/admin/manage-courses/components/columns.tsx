"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Components
import DeleteAFOSButton from "@/app/_features/admin/manage-courses/components/delete-afos-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type AFOS = {
  afos_code: string;
  afos: string;
  level: string;
};

export const columns: ColumnDef<AFOS>[] = [
  {
    accessorKey: "afos_code",
    header: "Code",
    size: 10,
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-blue-600 underline"
          href={`/admin/manage-courses/${row.original.afos_code}`}
        >
          {row.original.afos_code}
        </Link>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "afos",
    header: "Name",
    enableResizing: true,
    size: 1,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DeleteAFOSButton afosCode={row.original.afos_code} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
