"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DeleteModule from "@/app/_features/admin/manage-modules/actions/delete-module";

export default function DeleteModuleButton({ moduleId }: { moduleId: number }) {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        DeleteModule({ moduleId: moduleId }).then((response) => {
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
