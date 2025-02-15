"use client";

import PageTitle from "@/components/page-title";
import { ReadSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Subjects {
  subject_code: string;
  subject: string;
  instructor: number;
  module_id: number;
}

export default function ManageSubjectsPage({
  params,
}: {
  params: { moduleId: number };
}) {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjectsData() {
      try {
        const { success, data, message } = await ReadSubjects({
          module_id: params.moduleId,
        });
        if (success) {
          setSubjects(data as Array<Subjects>);
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubjectsData();
  }, [params.moduleId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Link href="/student/courses">
          <ChevronLeft />
        </Link>
        <PageTitle title="Subjects" />
      </div>
      {subjects.map((subject) => {
        return (
          <div
            key={subject.subject_code}
            className="border rounded-lg overflow-hidden"
          >
            <Link
              href={`/student/courses/${params.moduleId}/${subject.subject_code}`}
              className="flex "
            >
              <div className="w-6 h-24 bg-darkGreen-400"> </div>
              <div className="flex p-4 my-4 items-center gap-6">
                <div className="text-lg font-semibold">
                  {subject.subject_code}
                </div>
                <div>{subject.subject}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
