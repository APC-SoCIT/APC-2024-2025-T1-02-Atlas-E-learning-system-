"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreatePracticalScore(values: {
  score: number;
  studentSerial: number;
  subjectCode: string;
}) {
  const { score, studentSerial, subjectCode } = values;

  const sql = getDatabaseConnection();
  try {
    // Insert new score record into the database
    await sql`INSERT INTO StudentPracticalScores (score, student_serial, subject) VALUES (${score}, ${studentSerial}, ${subjectCode})`;
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
