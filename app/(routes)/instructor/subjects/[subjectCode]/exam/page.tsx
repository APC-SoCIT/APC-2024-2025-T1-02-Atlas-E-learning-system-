import ManageExam from "@/app/_features/instructor/manage-exam/components/manage-exam";

export default async function ExamPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return <ManageExam subjectCode={params.subjectCode} />;
}
