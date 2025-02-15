"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Components
import DeleteAFOS from "@/app/_features/admin/manage-courses/actions/delete-afos";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeleteAFOSButton({ afosCode }: { afosCode: string }) {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        DeleteAFOS({ afosCode: afosCode }).then((response) => {
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
