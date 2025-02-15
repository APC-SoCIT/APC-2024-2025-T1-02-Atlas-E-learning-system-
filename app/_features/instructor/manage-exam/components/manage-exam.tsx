"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import StudentCard from "./student-card";
import { ReadExam } from "../actions/read-exam";
import { ReadStudentsAfos } from "../actions/read-student-serial";
import { ReadUser } from "@/app/_features/admin/manage-users/actions/read-user";

type StudentSerial = {
  serial_number: number;
  user_id: number;
  afos_code: string;
};

type Student = {
  user_id: number;
  last_name: string;
  first_name: string;
  middle_initial: string;
  suffix: string;
  email: string;
  password: string;
  role: "Student" | "Instructor" | "Admin";
};

export default function ManageExam({ subjectCode }: { subjectCode: string }) {
  const [answers, setAnswers] = useState(false);
  const [exam, setExam] = useState(false);
  const [studentSerial, setStudentSerial] = useState<StudentSerial[]>([]);
  const [student, setStudent] = useState<Student[]>([]);

  useEffect(() => {
    ReadExam({ subjectCode: subjectCode }).then((response) => {
      console.log(response);
      if (response.success) {
        setExam(true);
      }
    });

    ReadStudentsAfos({ subjectCode: subjectCode }).then(async (response) => {
      if (response && response.data && Array.isArray(response.data.data)) {
        const studentSerials: StudentSerial[] = response.data
          .data as StudentSerial[];
        setStudentSerial(studentSerials);

        // Fetch student data using Promise.all
        const studentPromises = studentSerials.map((studentSerial) =>
          ReadUser({ user_id: studentSerial.user_id }).then((res) =>
            res && res.data && Array.isArray(res.data)
              ? (res.data as Student[])
              : []
          )
        );

        const studentsArray = await Promise.all(studentPromises);
        const flattenedStudents: Student[] = studentsArray.flat(); // Flatten the array in case of multiple responses

        setStudent(flattenedStudents);
      }
    });

    setAnswers(true);
  }, [subjectCode]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">List of answers of students</h2>
        {exam ? (
          <Link href={`/instructor/subjects/${subjectCode}/exam/view`}>
            <Button>View exam</Button>
          </Link>
        ) : (
          <Link href={`/instructor/subjects/${subjectCode}/exam/create`}>
            <Button>Create exam</Button>
          </Link>
        )}
      </div>
      {answers ? (
        <div className="py-6 grid gap-4">
          {studentSerial.map((studentSerial) => {
            const student1 = student.find(
              (student) => student.user_id === studentSerial.user_id
            );
            if (!student1) return null;

            return (
              <StudentCard
                key={studentSerial.serial_number}
                name={`${student1.first_name} ${student1.last_name}`}
                serialNumber={studentSerial.serial_number}
                subjectCode={subjectCode}
                score={0}
              />
            );
          })}
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
