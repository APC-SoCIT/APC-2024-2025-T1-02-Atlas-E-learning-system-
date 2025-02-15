"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadAfosData({ moduleId }: { moduleId: number }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Modules WHERE module_id = ${moduleId}`;
    if (records.length === 0) {
      return { success: false, message: "No module record found" };
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
