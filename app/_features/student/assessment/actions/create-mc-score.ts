"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateMCScore(values: {
  score: number;
  studentSerial: number;
  writtenExam: number;
}) {
  const { score, studentSerial, writtenExam } = values;

  const sql = getDatabaseConnection();
  try {
    // Insert new score record into the database
    await sql`INSERT INTO StudentMCScores (score, student_serial, written_exam) VALUES (${score}, ${studentSerial}, ${writtenExam})`;
    return {
      success: true,
      message: "Successfully created new score record",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later",
    };
  }
}
