"use server";

import { getDatabaseConnection } from "@/lib/db";

type Written = {
  written_exam: number;
  score: number;
  subject: string;
};

export async function ReadStudentGrades({ userId }: { userId: string }) {
  const sql = getDatabaseConnection();

  try {
    const studentSerial =
      await sql`SELECT * FROM Students WHERE user_id = ${userId}`;

    if (!studentSerial?.length) {
      return { success: false, message: "Student not found" };
    }

    const modules =
      await sql`SELECT * FROM Modules WHERE afos_code = ${studentSerial[0].afos_code}`;

    const subjects = await Promise.all(
      modules.map(async (module) => {
        const subjects =
          await sql`SELECT * FROM Subjects WHERE module_id = ${module.module_id}`;
        return subjects;
      })
    );
    const flattedSubjects = subjects.flat();

    const examIds = await Promise.all(
      flattedSubjects.map(async (subject) => {
        const exams =
          await sql`SELECT exam_id FROM WrittenExams WHERE subject = ${subject.subject_code}`;
        return exams.map((exam) => ({
          exam_id: exam.exam_id,
          subject: subject.subject_code,
        }));
      })
    );
    const flattedExamIds = examIds.flat();

    const practicalScores = await Promise.all(
      flattedSubjects.map(async (subject) => {
        const scores =
          await sql`SELECT * FROM StudentPracticalScores WHERE subject = ${subject.subject_code} AND student_serial = ${studentSerial[0].serial_number}`;
        return scores.map((score) => ({
          ...score,
          subject: subject.subject_code,
          student_serial: studentSerial[0].serial_number,
        }));
      })
    );

    const writtenScores = await Promise.all(
      flattedExamIds.map(async (exam) => {
        const scores =
          await sql`SELECT * FROM StudentWrittenScores WHERE written_exam = ${exam.exam_id} AND student_serial = ${studentSerial[0].serial_number}`;
        return scores.map((score) => ({
          written_exam: score.written_exam,
          score: score.score,
          subject: exam.subject,
        }));
      })
    );

    // Flatten the results
    const flatPracticalScores = practicalScores.flat();
    const flatWrittenScores = writtenScores.flat();

    // Merging logic
    const combinedScoresMap = new Map();

    flatPracticalScores.forEach((practical) => {
      const key = `${practical.student_serial}-${practical.subject}`;
      combinedScoresMap.set(key, { ...practical });
    });

    flatWrittenScores.forEach((written: Written) => {
      const key = `${studentSerial[0].serial_number}-${written.subject}`;
      if (combinedScoresMap.has(key)) {
        combinedScoresMap.set(key, {
          ...combinedScoresMap.get(key),
          written_exam: written.written_exam,
          written_score: written.score,
        });
      } else {
        combinedScoresMap.set(key, { ...written });
      }
    });

    const combinedScores = Array.from(combinedScoresMap.values());

    if (combinedScores.length === 0) {
      return { success: false, message: "No records found" };
    }

    return {
      success: true,
      subjects: flattedSubjects,
      data: combinedScores,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
