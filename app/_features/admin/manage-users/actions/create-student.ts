"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateStudent(values: {
  serialNumber: string;
  userId: number;
  afos: string;
}) {
  const { serialNumber, userId, afos } = values;

  const numericSerialNumber: number = parseInt(
    serialNumber.replace(/\D/g, ""),
    10
  );

  const trimmedAfos = afos.trim();

  const validationError = validate(trimmedAfos);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new student record into the database
    await sql`INSERT INTO Students (serial_number, user_id, afos_code) VALUES (${numericSerialNumber}, ${userId}, ${trimmedAfos})`;
    return { success: true, message: "Successfully added new student" };
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

function validate(trimmedAfos: string) {
  if (!trimmedAfos) {
    return "Please provide the AFOS";
  }
}
