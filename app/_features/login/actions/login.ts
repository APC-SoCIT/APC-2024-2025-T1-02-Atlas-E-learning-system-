"use server";

import { cookies } from "next/headers";
import { getDatabaseConnection } from "@/lib/db";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const sql = getDatabaseConnection();

  try {
    // Check if email exists
    const emailFound =
      await sql`SELECT 1 FROM Users WHERE email = ${email} LIMIT 1`;

    if (emailFound.length === 0) {
      return {
        success: false,
        message: "Email not found",
      };
    }

    // Check if password is correct
    const user =
      await sql`SELECT * FROM Users WHERE email = ${email} AND password = ${password}`;

    if (user.length === 0) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    // Run this if email and password match
    const userType = user[0].role;
    let redirectURL = "";

    if (userType === "Instructor") {
      redirectURL = "/instructor/subjects";
    } else if (userType === "Admin") {
      redirectURL = "/admin/dashboard";
    } else if (userType === "Student") {
      redirectURL = "/student/courses";
      const afosDesignation =
        await sql`SELECT * FROM Students WHERE user_id = ${user[0].user_id}`;
      (await cookies()).set("afosDesignation", afosDesignation[0].afos_code, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
    }

    (await cookies()).set("userType", userType, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    (await cookies()).set("userId", user[0].user_id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      data: user,
      redirectURL: redirectURL,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred",
    };
  }
}
