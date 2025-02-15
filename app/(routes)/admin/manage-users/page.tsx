import { ReadAllUsers } from "@/app/_features/admin/manage-users/actions/read-user";

// Components
import PageTitle from "@/components/page-title";
import AddUsersButton from "@/app/_features/admin/manage-users/components/add-users-button";
import EmptyPlaceholder from "@/components/empty-placeholder";
import { DataTable } from "@/app/_features/admin/manage-users/components/data-table";
import {
  User,
  columns,
} from "@/app/_features/admin/manage-users/components/columns";

async function getAllUsers(): Promise<User[]> {
  try {
    const { success, data, message } = await ReadAllUsers();
    if (success) {
      return data as Array<User>;
    } else {
      console.log(message || "An error occurred");
      return [];
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error.message : "An error occurred");
    return [];
  }
}

export default async function ManageUsersPage() {
  const data = await getAllUsers();

  return (
    <div className="max-w-[80rem] mx-10 xl:mx-auto">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <PageTitle title="Users Management" />
          <AddUsersButton />
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
