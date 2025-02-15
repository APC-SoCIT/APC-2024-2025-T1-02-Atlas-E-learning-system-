"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadSubjectData({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Subjects WHERE subject_code = ${subjectCode}`;
    if (records.length === 0) {
      return { success: false, message: "No subject record found" };
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
