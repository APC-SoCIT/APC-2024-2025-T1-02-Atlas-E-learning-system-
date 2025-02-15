"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Components
import DeleteModuleButton from "@/app/_features/admin/manage-modules/components/delete-module-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Module = {
  module_id: number;
  module_number: number;
  module: string;
  afos_code: string;
};

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: "module_id",
    header: "Module number",
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-blue-600 underline"
          href={`/admin/manage-courses/${row.original.afos_code}/${row.original.module_id}`}
        >
          {row.original.module_number}
        </Link>
      );
    },
  },
  {
    accessorKey: "module",
    header: "Name",
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
            <DeleteModuleButton moduleId={row.original.module_id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
