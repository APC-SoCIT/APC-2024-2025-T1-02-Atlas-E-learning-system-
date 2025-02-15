"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ManageSubjectLinks({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6">
      {[
        { name: "Videos", path: `/instructor/subjects/${subjectCode}/videos` },
        { name: "Exam", path: `/instructor/subjects/${subjectCode}/exam` },
        { name: "Grades", path: `/instructor/subjects/${subjectCode}/grades` },
      ].map(({ name, path }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            "relative px-4 py-2 transition duration-300 ease-in-out",
            pathname === path
              ? "text-darkGreen-600 before:scale-x-100"
              : "text-gray-700 before:scale-x-0",
            "before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-darkGreen-600 before:transition-transform before:duration-300 hover:text-darkGreen-600 hover:before:scale-x-100 active:scale-95"
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
