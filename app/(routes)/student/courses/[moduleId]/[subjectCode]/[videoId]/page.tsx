"use client";

import { ReadVideos } from "@/actions/db/read-video";
import Chatbot from "@/app/_features/student/courses/video/components/chatbot";
import Loader from "@/components/loader";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Video {
  video_id: string;
  title: string;
  description: string;
  url: string;
}

export default function WatchVideoPage({
  params,
}: {
  params: { moduleId: number; subjectCode: string; videoId: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const { success, data, message } = await ReadVideos({
          subjectCode: params.subjectCode,
        });
        if (success) {
          setVideo(data as Array<Video>);
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
    fetchVideoData();
  }, [params.subjectCode]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-4">
          <div className="grid gap-4 w-3/4">
            <div className="flex items-center gap-2">
              <Link
                href={`/student/courses/${params.moduleId}/${params.subjectCode}`}
              >
                <ChevronLeft className="hover:cursor-pointer" />
              </Link>
              <h1 className="text-2xl">{video[0].title}</h1>
            </div>
            <video controls preload="none" className="w-full">
              <source src={video[0].url} type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
            <p>Description: {video[0].description}</p>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}
