"use server";

import { CreateVideo } from "./create-video";

export async function upload(data: FormData, subjectCode: string) {
  const title = data.get("title") as string | null;
  const description = data.get("description") as string | null;

  if (!title || !description) {
    return { error: "Title or description is missing" };
  }

  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return { error: "No file selected" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await CreateVideo({
      subjectCode: subjectCode,
      title,
      description,
      file: buffer,
      filename: file.name,
    });

    if (!response.success) {
      return { error: "Failed to upload video" };
    }

    return { message: "Video uploaded successfully!" };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
