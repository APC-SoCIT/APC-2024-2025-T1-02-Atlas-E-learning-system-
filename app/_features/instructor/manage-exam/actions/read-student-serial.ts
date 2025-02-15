"use server";

import { getDatabaseConnection } from "@/lib/db";

export async function ReadStudentsAfos({
  subjectCode,
}: {
  subjectCode: string;
}) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Subjects WHERE subject_code = ${subjectCode}`;
    if (records.length === 0) {
      return { success: false, message: "No records found" };
    }

    const response = await ReadAfosUsingModuleId({
      moduleId: records[0].module_id,
    });
    const afos =
      response.data && response.data[0] ? response.data[0].afos_code : null;

    const data = await ReadStudentSerial({ AFOSCode: afos });

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

async function ReadAfosUsingModuleId({ moduleId }: { moduleId: number }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Modules WHERE module_id = ${moduleId}`;
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

async function ReadStudentSerial({ AFOSCode }: { AFOSCode: string }) {
  const sql = getDatabaseConnection();

  try {
    const records =
      await sql`SELECT * FROM Students WHERE afos_code = ${AFOSCode}`;
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
