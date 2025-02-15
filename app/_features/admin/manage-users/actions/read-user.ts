"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadUser({ user_id }: { user_id: number }) {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM Users WHERE user_id = ${user_id}`;
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

export async function ReadUserByEmail({ email }: { email: string }) {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM Users WHERE email = ${email}`;
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

export async function ReadAllUsers() {
  const sql = getDatabaseConnection();

  try {
    const records = await sql`SELECT * FROM Users`;
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
