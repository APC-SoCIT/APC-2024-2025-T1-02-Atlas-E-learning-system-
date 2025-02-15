"use client";

// Components
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditUserButton({ userId }: { userId: number }) {
  console.log(userId);
  console.log(userId);

  return (
    <Button className="flex gap-3" variant="ghost">
      <Pencil />
      <span>Edit</span>
    </Button>
  );
}
