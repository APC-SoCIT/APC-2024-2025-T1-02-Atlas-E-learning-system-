import CreateExam from "@/app/_features/instructor/manage-exam/components/create-exam";

export default function CreateExamPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return <CreateExam params={{ subjectCode: params.subjectCode }} />;
}
