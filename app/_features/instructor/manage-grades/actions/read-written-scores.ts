"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadWrittenScores({
  studentSerial,
  writtenExam,
}: {
  studentSerial: number;
  writtenExam: number;
}) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM StudentWrittenScores WHERE student_serial = ${studentSerial} AND written_exam = ${writtenExam}`;

    if (records.length === 0) {
      return { success: false, message: "No student record found" };
    }
    return {
      success: true,
      data: records,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
