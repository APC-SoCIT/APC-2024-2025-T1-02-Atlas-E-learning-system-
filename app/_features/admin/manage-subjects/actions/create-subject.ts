"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateSubject(values: {
  subjectCode: string;
  subject: string;
  moduleId: number;
}) {
  const { subjectCode, subject, moduleId } = values;
  const trimmedSubjectCode = subjectCode.trim();
  const trimmedSubject = subject.trim();

  const validationError = validate(
    trimmedSubjectCode,
    trimmedSubject,
    moduleId
  );
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new subject record into the database
    await sql`INSERT INTO Subjects (subject_code, subject, module_id) VALUES (${trimmedSubjectCode}, ${trimmedSubject}, ${moduleId})`;
    return { success: true, message: "Successfully added new AFOS" };
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

function validate(
  trimmedSubjectCode: string,
  trimmedSubject: string,
  moduleId: number
) {
  if (!trimmedSubjectCode) {
    return "Please provide the AFOS code";
  }
  if (!trimmedSubject) {
    return "Please provide the AFOS name";
  }
  if (!moduleId) {
    return "Please provide the AFOS level";
  }

  // Letters, numbers, spaces, and hyphens are only allowed for AFOS name
  const SubjectPattern = /^[a-zA-Z0-9\s-]+$/;
  if (!SubjectPattern.test(trimmedSubject)) {
    return "Subject name can only contain letters, numbers, spaces, and hyphens";
  }
}
