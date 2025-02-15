"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SubmitButton({ subjectCode }: { subjectCode: string }) {
  const router = useRouter();

  return (
    <Button
      type="submit"
      onClick={() => {
        router.push(`/instructor/subjects/${subjectCode}`);
      }}
    >
      Upload
    </Button>
  );
}
