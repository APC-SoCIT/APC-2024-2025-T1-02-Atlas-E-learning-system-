"use server";

import { getDatabaseConnection } from "@/lib/db";

export default async function CreateUser(values: {
  lastName: string;
  firstName: string;
  middleInitial: string;
  suffix: string;
  email: string;
  password: string;
  role: "Student" | "Instructor" | "Admin";
}) {
  const { lastName, firstName, middleInitial, suffix, email, password, role } =
    values;

  const trimmedLastName = lastName.trim();
  const trimmedFirstName = firstName.trim();
  const trimmedMiddleInitial = middleInitial.trim();
  const trimmedSuffix = suffix.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const validationError = validate(
    trimmedLastName,
    trimmedFirstName,
    trimmedMiddleInitial,
    trimmedSuffix,
    trimmedEmail,
    trimmedPassword
  );
  if (validationError) {
    return { success: false, message: validationError };
  }

  const sql = getDatabaseConnection();
  try {
    // Insert new user record into the database
    await sql`INSERT INTO Users (last_name, first_name, middle_initial, suffix, email, password, role) VALUES (${trimmedLastName}, ${trimmedFirstName}, ${trimmedMiddleInitial}, ${trimmedSuffix}, ${trimmedEmail}, ${trimmedPassword}, ${role})`;
    return { success: true, message: "Successfully added new user" };
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
  trimmedLastName: string,
  trimmedFirstName: string,
  trimmedMiddleInitial: string,
  trimmedSuffix: string,
  trimmedEmail: string,
  trimmedPassword: string
) {
  if (!trimmedLastName) {
    return "Please provide the last name";
  }
  if (!trimmedFirstName) {
    return "Please provide the first name";
  }
  if (!trimmedEmail) {
    return "Please provide the email";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return "Please provide a valid email address";
  }
  if (!trimmedPassword) {
    return "Please provide the password";
  }
}
