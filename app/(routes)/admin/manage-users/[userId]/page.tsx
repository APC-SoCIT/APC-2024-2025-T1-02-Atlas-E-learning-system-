"use client";

import { ReadUser } from "@/app/_features/admin/manage-users/actions/read-user";
import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import Loader from "@/components/loader";
import PageTitle from "@/components/page-title";
import EditUserButton from "@/app/_features/admin/manage-users/components/edit-user-button";
import DeleteUserButton from "@/app/_features/admin/manage-users/components/delete-user-button";
import { ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReadStudent } from "@/app/_features/admin/manage-users/actions/read-student";

type User = {
  user_id: number;
  last_name: string;
  first_name: string;
  middle_initial?: string;
  suffix?: string;
  email: string;
  role: "Admin" | "Student" | "Instructor";
};

type Student = {
  serial_number: number;
  user_id: number;
  afos_code: string;
};

export default function ManageSubjectsPage({
  params,
}: {
  params: { userId: number };
}) {
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { success, data, message } = await ReadUser({
          user_id: params.userId,
        });
        if (success) {
          setUser(data as Array<User>);
          if (data ? data[0].role === "Student" : false) {
            ReadStudent({ userId: params.userId.toString() }).then(
              (response) => {
                if (response.success) {
                  setStudent(response.data as Array<Student>);
                } else {
                  console.log(response.message || "An error occurred");
                }
              }
            );
          }
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [params.userId]);

  return (
    <div className="m-auto rounded-md grid gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link
            href="/admin/manage-users"
            className="transition-all ease-in-out hover:text-green-900"
          >
            <ChevronLeft />
          </Link>
          <PageTitle title="Manage User" />
        </div>
        <div className="flex gap-2">
          <EditUserButton userId={params.userId} />
          <DeleteUserButton userId={params.userId} />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4">
          <div className="p-5 w-1/3 shadow-md bg-gray-200 grid gap-4 place-items-center rounded-md">
            <svg
              fill="#333"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width="13vw"
              height="13vw"
              viewBox="796 796 200 200"
              enable-background="new 796 796 200 200"
            >
              <path
                d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100
	C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924
	s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86
	c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761
	c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719
	c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817
	C943.037,973.621,920.691,983.86,896,983.86z"
              />
            </svg>
            <h3 className="text-2xl font-semibold">
              {user[0].first_name} {user[0]?.middle_initial || ""}{" "}
              {user[0]?.middle_initial ? "." : ""} {user[0].last_name}
            </h3>
            <p>{user[0].role}</p>
          </div>
          <div className="p-5 w-2/3 shadow-md bg-gray-200 rounded-md flex">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[130px]">Label</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">User ID:</TableCell>
                  <TableCell>{params.userId}</TableCell>
                </TableRow>
                {user[0].role === "Student" && (
                  <TableRow>
                    <TableCell className="font-semibold">
                      Serial number:
                    </TableCell>
                    <TableCell>
                      {student[0] ? student[0].serial_number : "N/A"}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="font-semibold">Last name:</TableCell>
                  <TableCell>{user[0].last_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">First name:</TableCell>
                  <TableCell>{user[0].first_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Middle initial:
                  </TableCell>
                  <TableCell>{user[0]?.middle_initial || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Suffix:</TableCell>
                  <TableCell>{user[0]?.suffix || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Email:</TableCell>
                  <TableCell>{user[0].email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Role:</TableCell>
                  <TableCell>{user[0].role}</TableCell>
                </TableRow>
                {user[0].role === "Student" && (
                  <TableRow>
                    <TableCell className="font-semibold">AFOS:</TableCell>
                    <TableCell>
                      {student[0] ? student[0].afos_code : "N/A"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
