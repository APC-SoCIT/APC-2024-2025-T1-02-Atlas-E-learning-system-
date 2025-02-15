"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadStudentSerial({ userId }: { userId: number }) {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM Students WHERE user_id = ${userId}`;
    if (records.length === 0) {
      return { success: false, message: "No records found" };
    }

    const data = records[0];

    return {
      success: true,
      data: data.serial_number,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
