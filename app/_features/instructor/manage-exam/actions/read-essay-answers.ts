"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadEssayAnswers({
  examQuestionId,
  studentSerial,
}: {
  examQuestionId: number;
  studentSerial: number;
}) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM StudentEssayAnswers WHERE exam_question_id = ${examQuestionId} AND student_serial = ${studentSerial}`;
    if (records.length === 0) {
      return { success: false, message: "No records found" };
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
