"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function DeleteModule(values: { moduleId: number }) {
  const { moduleId } = values;

  const sql = getDatabaseConnection();
  try {
    // Delete module record in the database
    const [record] =
      await sql`DELETE FROM Modules WHERE module_id = ${moduleId} RETURNING module_id`;

    if (record.length === 0) {
      return { success: false, message: "No record found" };
    }

    return {
      success: true,
      message: `Successfully deleted module`,
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
