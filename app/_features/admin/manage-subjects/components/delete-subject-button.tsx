"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DeleteSubject from "@/app/_features/admin/manage-subjects/actions/delete-subject";

export default function DeleteSubjectButton({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        DeleteSubject({ subjectCode: subjectCode }).then((response) => {
          router.refresh();
          toast({
            variant: "destructive",
            description: response.message,
          });
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
