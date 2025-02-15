"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function DeleteAFOS(values: { afosCode: string }) {
  const { afosCode } = values;
  const trimmedAfosCode = afosCode.trim();

  const sql = getDatabaseConnection();
  try {
    // Delete AFOS record in the database
    const [record] =
      await sql`DELETE FROM AFOS WHERE afos_code = ${trimmedAfosCode} RETURNING afos_code`;

    if (record.length === 0) {
      return { success: false, message: "No record found" };
    }

    return {
      success: true,
      message: `Successfully deleted ${record.afos_code}`,
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
