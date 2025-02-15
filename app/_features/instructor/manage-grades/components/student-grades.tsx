"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import CreatePracticalScore from "../actions/create-practical-score";

interface Student {
  serial_number: string;
  first_name: string;
  last_name: string;
  middle_initial: string;
  score: number;
}

export default function StudentGrades({
  students,
  subjectCode,
}: {
  students: Student[];
  subjectCode: string;
}) {
  const [practicalScores, setPracticalScores] = useState<{
    [key: string]: number;
  }>({});

  function handlePracticalScoreChange(serial: string, value: string) {
    setPracticalScores((prev) => ({
      ...prev,
      [serial]: Number(value) || 0,
    }));
  }

  function releaseGrades() {
    students.map((student) => {
      const total =
        student.score + (practicalScores[student.serial_number] || 0);

      if (practicalScores[student.serial_number] === undefined) {
        return null;
      }

      CreatePracticalScore({
        score: practicalScores[student.serial_number] || 0,
        studentSerial: Number(student.serial_number),
        subjectCode: subjectCode,
      });
      return {
        serial_number: student.serial_number,
        name: `${student.first_name} ${student.middle_initial}. ${student.last_name}`,
        written_score: student.score,
        practical_score: practicalScores[student.serial_number] || 0,
        total,
      };
    });
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Written score</TableHead>
            <TableHead>Practical score</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const total =
              (practicalScores[student.serial_number] ?? 0) > 0
                ? (student.score / 100) * 40 +
                  ((practicalScores[student.serial_number] ?? 0) / 100) * 60
                : student.score || 0;
            return (
              <TableRow key={student.serial_number}>
                <TableCell>{student.serial_number}</TableCell>
                <TableCell>
                  {student.first_name} {student.middle_initial}.{" "}
                  {student.last_name}
                </TableCell>
                <TableCell>{student.score}</TableCell>
                <TableCell>
                  <Input
                    value={practicalScores[student.serial_number] || ""}
                    onChange={(e) =>
                      handlePracticalScoreChange(
                        student.serial_number,
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>{total.toFixed(0)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4">
        <Button onClick={releaseGrades}>Release Grades</Button>
      </div>
    </div>
  );
}
