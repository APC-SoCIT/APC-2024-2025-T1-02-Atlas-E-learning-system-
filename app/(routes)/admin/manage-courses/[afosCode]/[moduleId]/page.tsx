import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ReadSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";

// Components
import AddSubjectButton from "@/app/_features/admin/manage-subjects/components/add-subject-button";
import PageTitle from "@/components/page-title";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { DataTable } from "@/app/_features/admin/manage-subjects/components/data-table";
import { ChevronLeft } from "lucide-react";
import {
  Subject,
  columns,
} from "@/app/_features/admin/manage-subjects/components/columns";

async function getSubjects({
  afosCode,
  moduleId,
}: {
  afosCode: string;
  moduleId: number;
}): Promise<Subject[]> {
  try {
    revalidatePath(`/admin/manage-courses/${afosCode}/${moduleId}`);
    const { success, data, message } = await ReadSubjects({
      module_id: moduleId,
    });
    if (success) {
      return data as Array<Subject>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageSubjectsPage({
  params,
}: {
  params: { moduleId: number; afosCode: string };
}) {
  const data = await getSubjects({
    afosCode: params.afosCode,
    moduleId: params.moduleId,
  });

  return (
    <div className=" max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin/manage-courses/${params.afosCode}`}
              className="transition-all ease-in-out hover:text-green-900"
            >
              <ChevronLeft />
            </Link>
            <PageTitle title="Subjects Management" />
          </div>
          <AddSubjectButton moduleId={params.moduleId} />
        </div>
        {data.length === 0 ? (
          <EmptyPlaceholder />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
