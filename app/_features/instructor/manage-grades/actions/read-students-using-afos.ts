"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadStudentUsingAfos({ afosCode }: { afosCode: string }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Students WHERE afos_code = ${afosCode}`;
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
