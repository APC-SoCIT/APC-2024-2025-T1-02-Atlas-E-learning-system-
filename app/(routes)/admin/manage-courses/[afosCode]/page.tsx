import { revalidatePath } from "next/cache";
import { ReadModules } from "@/app/_features/admin/manage-modules/actions/read-module";
import Link from "next/link";

// Components
import AddModuleButton from "@/app/_features/admin/manage-modules/components/add-module-button";
import PageTitle from "@/components/page-title";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { DataTable } from "@/app/_features/admin/manage-modules/components/data-table";
import {
  Module,
  columns,
} from "@/app/_features/admin/manage-modules/components/columns";
import { ChevronLeft } from "lucide-react";

async function getModules({
  afosCode,
}: {
  afosCode: string;
}): Promise<Module[]> {
  try {
    revalidatePath(`/admin/manage-courses/${afosCode}`);
    const { success, data, message } = await ReadModules({
      afos_code: afosCode,
    });
    if (success) {
      return data as Array<Module>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageModulesPage({
  params,
}: {
  params: { afosCode: string };
}) {
  const data = await getModules({ afosCode: params.afosCode });

  return (
    <div className=" max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link
              href="/admin/manage-courses"
              className="transition-all ease-in-out hover:text-green-900"
            >
              <ChevronLeft />
            </Link>
            <PageTitle title="Modules Management" />
          </div>
          <AddModuleButton
            afosCode={params.afosCode}
            moduleLength={data.length}
          />
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
