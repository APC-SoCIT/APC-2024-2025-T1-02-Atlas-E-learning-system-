"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateChoice(values: {
  choice: string;
  examQuestionId: number;
}) {
  const { examQuestionId, choice } = values;

  const validationError = validate(choice);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new choice record into the database
    await sql`INSERT INTO ExamQuestionChoices (choice, exam_question_id) VALUES (${choice}, ${examQuestionId})`;
    return {
      success: true,
      message: "Successfully created new choice",
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

function validate(choice: string) {
  if (!choice) {
    return "Please provide the choice";
  }
}
