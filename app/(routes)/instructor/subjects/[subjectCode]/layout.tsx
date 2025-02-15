import Link from "next/link";

// Components
import { ChevronLeft } from "lucide-react";
import ManageSubjectLinks from "@/app/_features/instructor/subject-list/manage-subject-links";

export default async function Layout({
  params,
  children,
}: {
  params: { subjectCode: string };
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-10 mb-4">
        <div className="flex items-center gap-4">
          <Link href="/instructor/subjects">
            <ChevronLeft />
          </Link>
          <h2 className="text-2xl font-semibold">{params.subjectCode}</h2>
        </div>
        <ManageSubjectLinks subjectCode={params.subjectCode.toString()} />
      </div>
      <div>{children}</div>
    </div>
  );
}
