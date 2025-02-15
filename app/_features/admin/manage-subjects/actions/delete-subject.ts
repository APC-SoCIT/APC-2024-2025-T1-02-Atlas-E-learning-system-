"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function DeleteSubject(values: { subjectCode: string }) {
  const { subjectCode } = values;

  const sql = getDatabaseConnection();
  try {
    // Delete subject record in the database
    const [record] =
      await sql`DELETE FROM Subjects WHERE subject_code = ${subjectCode} RETURNING subject_code`;

    if (record.length === 0) {
      return { success: false, message: "No record found" };
    }

    return {
      success: true,
      message: `Successfully deleted subject`,
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
