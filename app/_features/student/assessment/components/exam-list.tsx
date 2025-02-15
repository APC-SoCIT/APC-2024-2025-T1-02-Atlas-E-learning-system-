"use client";

import { useEffect, useState } from "react";
import { ReadModules } from "@/app/_features/admin/manage-modules/actions/read-module";
import { ReadSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";
import { ReadExams } from "../actions/read-exam";
import Link from "next/link";
import Loader from "@/components/loader";

interface Exam {
  exam_id: number;
  duration: number;
  availability: Date;
  subject: string;
}

export default function ExamList({
  afosDesignation,
}: {
  afosDesignation: string;
}) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const subjects: string[] = [];
        const response = await ReadModules({ afos_code: afosDesignation });

        if (response.success) {
          const modules = response.data;

          if (modules) {
            for (const mod of modules) {
              const data = await ReadSubjects({ module_id: mod.module_id });
              const subjectList = data.data;

              if (subjectList) {
                for (const subject of subjectList) {
                  subjects.push(subject.subject_code.toString());
                }
              }
            }
          }
        } else {
          console.log(response.message);
        }

        const examResults: Exam[] = [];
        for (const subject of subjects) {
          const examResponse = await ReadExams({ subjectCode: subject });
          if (examResponse.data && examResponse.data.length > 0) {
            examResults.push({
              exam_id: examResponse.data[0].exam_id,
              duration: examResponse.data[0].duration,
              availability: new Date(examResponse.data[0].availability),
              subject: examResponse.data[0].subject,
            });
          }
        }

        setExams(examResults);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [afosDesignation]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-2">
      {exams.map((exam) => {
        const availabilityTime =
          exam.availability.getTime() - 8 * 60 * 60 * 1000;
        const currentTime = new Date().getTime();
        const endTime = availabilityTime + exam.duration * 60 * 60 * 1000;

        console.log("Start Time:", new Date(availabilityTime).toLocaleString());
        console.log("Current Time:", new Date(currentTime).toLocaleString());
        console.log("End Time:", new Date(endTime).toLocaleString());

        const isAvailable =
          availabilityTime < currentTime && endTime > currentTime;

        console.log("Is Exam Available?", isAvailable);

        return (
          <>
            {isAvailable ? (
              <Link href={`assessments/${exam.exam_id}`} key={exam.exam_id}>
                <div
                  className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 
              transition-all duration-300 hover:shadow-xl hover:border-gray-400 dark:hover:border-gray-500 
              active:shadow-md cursor-pointer"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exam.subject}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Date: {exam.availability.toLocaleDateString("en-US")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Duration: {exam.duration} hours
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Time:{" "}
                      {exam.availability.toLocaleTimeString("en-US", {
                        hour12: false,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={exam.exam_id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 
              transition-all duration-300 opacity-50"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exam.subject}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Date: {exam.availability.toLocaleDateString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Duration: {exam.duration} hours
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Time:{" "}
                    {exam.availability.toLocaleTimeString("en-US", {
                      hour12: false,
                    })}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
