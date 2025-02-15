"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateQuestion(values: {
  itemNumber: number;
  question: string;
  correctAnswer: string;
  examType: string;
  writtenExamId: number;
}) {
  const { itemNumber, question, correctAnswer, examType, writtenExamId } =
    values;

  const validationError = validate(question);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new question record into the database
    const returnedData =
      await sql`INSERT INTO ExamQuestions (item_number, question, correct_answer, exam_type, written_exam) VALUES (${itemNumber}, ${question}, ${correctAnswer}, ${examType}, ${writtenExamId}) RETURNING *`;
    return {
      success: true,
      message: "Successfully created new question",
      data: returnedData,
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

function validate(question: string) {
  if (!question) {
    return "Please provide the availability date and time";
  }
}
