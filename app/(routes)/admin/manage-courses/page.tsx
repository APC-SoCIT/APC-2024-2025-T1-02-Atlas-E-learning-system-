import { revalidatePath } from "next/cache";
import { ReadAllAFOS } from "@/app/_features/admin/manage-courses/actions/read-afos";

// Components
import PageTitle from "@/components/page-title";
import AddAFOSButton from "@/app/_features/admin/manage-courses/components/add-afos-button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import {
  AFOS,
  columns,
} from "@/app/_features/admin/manage-courses/components/columns";
import { DataTable } from "@/app/_features/admin/manage-courses/components/data-table";

async function getAllAFOS(): Promise<AFOS[]> {
  try {
    revalidatePath("/admin/manage-courses");
    const { success, data, message } = await ReadAllAFOS();
    if (success) {
      return data as Array<AFOS>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageCoursesPage() {
  const data = await getAllAFOS();

  return (
    <div className="max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="AFOS Management" />
          <AddAFOSButton />
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
