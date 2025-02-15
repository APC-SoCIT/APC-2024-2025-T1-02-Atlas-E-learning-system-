"use client";

import { ReadModules } from "@/app/_features/admin/manage-modules/actions/read-module";
import Loader from "@/components/loader";
import PageTitle from "@/components/page-title";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Modules {
  module_id: number;
  module_number: number;
  module: string;
  afos_code: string;
}

export default function SubjectsList({
  afosDesignation,
}: {
  afosDesignation: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<Modules[]>([]);

  useEffect(() => {
    async function fetchModulesData() {
      try {
        const { success, data, message } = await ReadModules({
          afos_code: afosDesignation,
        });
        if (success) {
          setModules(data as Array<Modules>);
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

    fetchModulesData();
  }, [afosDesignation]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="grid gap-4">
      <PageTitle title={`Modules for ${afosDesignation}`} />
      {modules.map((module) => {
        return (
          <div
            key={module.module_id}
            className="border rounded-lg overflow-hidden"
          >
            <Link
              href={`/student/courses/${module.module_id}`}
              className="flex "
            >
              <div className="w-6 h-24 bg-darkGreen-400"> </div>
              <div className="flex p-4 my-4 items-center gap-6">
                <div className="text-lg font-semibold">
                  Module {module.module_number}
                </div>
                <div>{module.module}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
