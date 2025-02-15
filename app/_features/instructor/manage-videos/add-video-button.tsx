"use client";

import { useRouter } from "next/navigation";

// Components
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddVideoButton({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/instructor/subjects/${subjectCode}/upload-video`);
      }}
    >
      <Plus />
      <span>Add</span>
    </Button>
  );
}
