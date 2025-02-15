import { cookies } from "next/headers";
import SubjectsList from "./_components/subjects-list";

export default function CoursesPage() {
  const cookieStore = cookies();
  const afosDesignation = cookieStore.get("afosDesignation")?.value;

  return afosDesignation && <SubjectsList afosDesignation={afosDesignation} />;
}
