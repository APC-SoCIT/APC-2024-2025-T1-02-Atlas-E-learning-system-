"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateWrittenScore(values: {
  studentSerial: number;
  writtenExam: number;
  essayScore: number;
}) {
  const { studentSerial, writtenExam, essayScore } = values;

  const validationError = validate(essayScore);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    const mcScoreResponse =
      await sql`SELECT * FROM StudentMCScores WHERE student_serial = ${studentSerial} AND written_exam = ${writtenExam}`;

    const mcScore = mcScoreResponse[0].score;

    const totalScore = mcScore + essayScore;
    const data =
      await sql`INSERT INTO StudentWrittenScores (score, student_serial, written_exam) VALUES (${totalScore}, ${studentSerial}, ${writtenExam}) RETURNING *`;
    return {
      success: true,
      message: "Successfully created new exam",
      data: data,
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

function validate(essayScore: number) {
  if (!essayScore) {
    return "Please provide the essay score";
  }
}
