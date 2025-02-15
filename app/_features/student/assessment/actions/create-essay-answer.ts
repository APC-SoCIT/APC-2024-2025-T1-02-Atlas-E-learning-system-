"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateEssayAnswer(values: {
  answerText: string;
  studentSerial: number;
  examQuestionId: number;
}) {
  const { examQuestionId, studentSerial, answerText } = values;

  const validationError = validate(answerText);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new answer record into the database
    await sql`INSERT INTO StudentEssayAnswers (answer_text, student_serial, exam_question_id) VALUES (${answerText}, ${studentSerial}, ${examQuestionId})`;
    return {
      success: true,
      message: "Successfully created new answer record",
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

function validate(answer: string) {
  if (!answer) {
    return "Please provide the answer text";
  }
}
