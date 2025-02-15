"use client";

import { ReadAllVideos } from "@/actions/db/read-videos";
import Link from "next/link";
import { useEffect, useState } from "react";

// Components
import EmptyPlaceholder from "@/components/empty-placeholder";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Video {
  video_id: string;
  title: string;
  description: string;
  url: string;
}

export default function SubjectVideos() {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchSubjectsData() {
      try {
        const { success, data, message } = await ReadAllVideos();
        if (success) {
          setVideos(data as Array<Video>);
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
    fetchSubjectsData();
  }, []);

  return (
    <div className="py-5 mx-10 xl:mx-auto">
      <div className="grid gap-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {video.length === 0 ? (
              <EmptyPlaceholder />
            ) : (
              <div className="grid gap-2">
                <Table className="border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Title</TableHead>
                      <TableHead className="w-[180px]">Description</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {video.map((record) => (
                      <TableRow key={record.video_id}>
                        <TableCell>{record.title}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>
                          <Link
                            className="text-blue-700 underline"
                            href={record.url}
                            target="_blank"
                          >
                            {record.url}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">
                            <Pencil size={16} />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost">
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
