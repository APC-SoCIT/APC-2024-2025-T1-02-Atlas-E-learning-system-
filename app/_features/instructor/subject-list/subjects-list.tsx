"use client";

import { ReadInstructorSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";
import { useEffect, useState } from "react";

// Components
import SubjectCard from "./subject-card";
import Loader from "@/components/loader";

interface Subjects {
  subject_code: string;
  subject: string;
  instructor: number;
  module_id: number;
}

export default function SubjectsList({ userId }: { userId: string }) {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInstructorSubjects() {
      try {
        if (userId) {
          const { success, data, message } = await ReadInstructorSubjects({
            instructorId: parseInt(userId, 10),
          });

          if (success) {
            setSubjects(data as Array<Subjects>);
          } else {
            console.log(message || "An error occurred");
          }
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchInstructorSubjects();
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4 flex-wrap">
            {subjects.map((record) => (
              <SubjectCard
                key={record.subject_code}
                subjectName={record.subject}
                subjectCode={record.subject_code}
              />
            ))}
        </div>
      )}
    </>
  );
}
