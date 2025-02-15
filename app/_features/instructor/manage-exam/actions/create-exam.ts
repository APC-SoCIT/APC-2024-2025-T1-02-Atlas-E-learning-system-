"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateExamRecord(values: {
  duration: number;
  availability: string;
  subjectCode: string;
}) {
  const { subjectCode, availability, duration } = values;

  const validationError = validate(duration, availability, subjectCode);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new exam record into the database
    const id =
      await sql`INSERT INTO WrittenExams (duration, availability, subject) VALUES (${duration}, ${availability}, ${subjectCode}) RETURNING *`;
    return {
      success: true,
      message: "Successfully created new exam",
      id: id,
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

function validate(duration: number, availability: string, subjectCode: string) {
  if (!duration) {
    return "Please provide the the duration";
  }
  if (!availability) {
    return "Please provide the availability date and time";
  }
  if (!subjectCode) {
    return "Please provide the subject code";
  }
}
