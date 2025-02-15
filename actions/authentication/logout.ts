"use server";

import { cookies } from "next/headers";

export async function logout() {
  const redirectURL = "/";

  // Remove the userType cookie by setting it with a maxAge of 0
  (await cookies()).set("userType", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  // Remove the userId cookie by setting it with a maxAge of 0
  (await cookies()).set("userId", "", {
    httpOnly: true,
    maxAge: 0,
  });

  // Remove the afosDesignation cookie by setting it with a maxAge of 0
  (await cookies()).set("afosDesignation", "", {
    httpOnly: true,
    maxAge: 0,
  });

  return {
    success: true,
    message: "Logged out successfully",
    redirectURL,
  };
}
