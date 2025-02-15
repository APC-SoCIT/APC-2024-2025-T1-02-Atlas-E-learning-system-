import ExamList from "@/app/_features/student/assessment/components/exam-list";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { cookies } from "next/headers";

export default async function AssessmentPage() {
  const cookieStore = await cookies();
  const afosDesignation = cookieStore.get("afosDesignation")?.value.toString();

  if (!afosDesignation) {
    return <EmptyPlaceholder />;
  }

  return <ExamList afosDesignation={afosDesignation} />;
}
