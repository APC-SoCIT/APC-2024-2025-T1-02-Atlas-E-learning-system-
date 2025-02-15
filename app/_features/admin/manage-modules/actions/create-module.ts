"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateModule(values: {
  moduleNumber: number;
  module: string;
  afosCode: string;
}) {
  const { moduleNumber, module, afosCode } = values;
  const trimmedModule = module.trim();

  const validationError = validate(moduleNumber, trimmedModule);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new module record into the database
    await sql`INSERT INTO Modules (module_number, module, afos_code) VALUES (${moduleNumber}, ${trimmedModule}, ${afosCode})`;
    return { success: true, message: "Successfully added new module" };
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

function validate(moduleNumber: number, module: string) {
  if (!module) {
    return "Please provide the module name";
  }
  if (!moduleNumber) {
    return "Please provide the module number";
  }
  const modulePattern = /^[a-zA-Z0-9\s-]+$/;
  if (!modulePattern.test(module)) {
    return "Module name can only contain letters, numbers, spaces, and hyphens";
  }
}
