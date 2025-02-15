"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateAFOS(values: {
  afosCode: string;
  afos: string;
  level: "Basic" | "Advanced";
}) {
  const { afosCode, afos, level } = values;
  const trimmedAfosCode = afosCode.trim();
  const trimmedAfos = afos.trim();

  const validationError = validate(trimmedAfosCode, trimmedAfos, level);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new AFOS record into the database
    await sql`INSERT INTO AFOS (afos_code, afos, level) VALUES (${trimmedAfosCode}, ${trimmedAfos}, ${level})`;
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
  trimmedAfosCode: string,
  afos: string,
  level: "Basic" | "Advanced"
) {
  if (!trimmedAfosCode) {
    return "Please provide the AFOS code";
  }
  if (!afos) {
    return "Please provide the AFOS name";
  }
  if (!level) {
    return "Please provide the AFOS level";
  }

  // Letters, numbers, spaces, and hyphens are only allowed for AFOS name
  const AFOSPattern = /^[a-zA-Z0-9\s-]+$/;
  if (!AFOSPattern.test(afos)) {
    return "AFOS name can only contain letters, numbers, spaces, and hyphens";
  }
}