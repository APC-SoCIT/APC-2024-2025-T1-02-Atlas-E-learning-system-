"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadSubjects({ module_id }: { module_id: number }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Subjects WHERE module_id = ${module_id}`;
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

export async function ReadInstructorSubjects({
  instructorId: instructorId,
}: {
  instructorId: number;
}) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Subjects WHERE instructor = ${instructorId}`;
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
