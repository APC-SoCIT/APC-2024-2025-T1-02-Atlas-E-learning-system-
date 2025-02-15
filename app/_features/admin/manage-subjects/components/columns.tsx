"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Components
import DeleteSubjectButton from "@/app/_features/admin/manage-subjects/components/delete-subject-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Subject = {
  subject_code: string;
  subject: string;
  instructor: number;
  module_id: number;
};

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "subject_code",
    header: "Subject code",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-blue-600 underline"
          href={`/admin/manage-users/${row.original.instructor}`}
        >
          {row.original.instructor}
        </Link>
      );
    },
  },
  {
    accessorKey: "subject",
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
            <DeleteSubjectButton subjectCode={row.original.subject_code} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
