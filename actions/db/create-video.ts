"use server";

import { getDatabaseConnection } from "@/lib/db";
import { put } from "@vercel/blob";

export async function CreateVideo({
  subjectCode,
  title,
  description,
  file,
  filename,
}: {
  subjectCode: string;
  title: string;
  description: string;
  file: Buffer | Blob | ReadableStream;
  filename: string;
}) {
  const blob = await put(filename, file, {
    access: "public",
  });

  const { url } = blob;

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  const sql = getDatabaseConnection();
  try {
    // Insert new video record into the database
    await sql`INSERT INTO Videos (title, description, url, subject) VALUES (${trimmedTitle}, ${trimmedDescription}, ${url}, ${subjectCode})`;
    return { success: true, message: "Successfully added new video" };
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
