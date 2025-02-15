import { ReadExam } from "@/app/_features/instructor/manage-exam/actions/read-exam";
import { ReadAfosData } from "@/app/_features/instructor/manage-grades/actions/read-afos-data";
import { ReadStudentData } from "@/app/_features/instructor/manage-grades/actions/read-student-data";
import { ReadStudentUsingAfos } from "@/app/_features/instructor/manage-grades/actions/read-students-using-afos";
import { ReadSubjectData } from "@/app/_features/instructor/manage-grades/actions/read-subject-data";
import { ReadWrittenScores } from "@/app/_features/instructor/manage-grades/actions/read-written-scores";
import StudentGrades from "@/app/_features/instructor/manage-grades/components/student-grades";

async function getStudents(afosCode: string) {
  const response = await ReadStudentUsingAfos({ afosCode: afosCode });
  return response;
}

async function getStudentData({ userId }: { userId: number }) {
  const response = await ReadStudentData({ userId: userId });
  return response;
}

async function getExamId({ subjectCode }: { subjectCode: string }) {
  const response = await ReadExam({ subjectCode: subjectCode });
  return response;
}

async function getWrittenScores({
  studentSerial,
  writtenExam,
}: {
  studentSerial: number;
  writtenExam: number;
}) {
  const response = await ReadWrittenScores({
    studentSerial: studentSerial,
    writtenExam: writtenExam,
  });
  return response;
}

async function getSubjectData({ subjectCode }: { subjectCode: string }) {
  const response = await ReadSubjectData({ subjectCode: subjectCode });
  return response;
}

async function getAfosData({ moduleId }: { moduleId: number }) {
  const response = await ReadAfosData({ moduleId: moduleId });
  return response;
}

export default async function GradesPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  const subjectData = await getSubjectData({ subjectCode: params.subjectCode });
  const afosData = await getAfosData({
    moduleId: subjectData.data?.[0].module_id,
  });
  const data = await getStudents(afosData.data?.[0].afos_code);
  const studentSerials = data.data;
  const studentList = await Promise.all(
    studentSerials?.map(async (student) => {
      const studentData = await getStudentData({ userId: student.user_id });
      return studentData.data;
    }) || []
  );

  // Flatten studentList array
  const flattenedStudents = studentList.flat();

  // Merge studentList with studentSerials
  const mergedData = flattenedStudents.map((student) => {
    // Find the matching serial info using user_id
    const serialInfo = studentSerials?.find(
      (serial) => serial.user_id === student?.user_id
    );
    // Merge student data with serial info
    return {
      ...student,
      serial_number: serialInfo ? serialInfo.serial_number : null,
      afos_code: serialInfo ? serialInfo.afos_code : null,
      first_name: student?.first_name || "",
      last_name: student?.last_name || "",
      middle_initial: student?.middle_initial || "",
    };
  });

  const examData = await getExamId({
    subjectCode: params.subjectCode,
  });
  const examId = examData.data?.[0].exam_id;

  const writtenScores = await Promise.all(
    mergedData.map(async (student) => {
      const scores = await getWrittenScores({
        studentSerial: student.serial_number,
        writtenExam: examId,
      });

      return scores.data?.[0];
    })
  );

  const finalMergedData = mergedData.map((student) => {
    // Find the matching score using student_serial
    const scoreInfo = writtenScores.find(
      (score) => score?.student_serial === student.serial_number
    );

    // Merge student data with score info
    return {
      ...student,
      score_id: scoreInfo ? scoreInfo.score_id : null,
      score: scoreInfo ? scoreInfo.score : null,
      written_exam: scoreInfo ? scoreInfo.written_exam : null,
    };
  });

  return (
    <StudentGrades
      students={finalMergedData}
      subjectCode={params.subjectCode}
    />
  );
}
