"use client";

import { upload } from "@/actions/db/upload";
import SubmitButton from "./_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Loader from "@/components/loader";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ManageVideosPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <form
      onSubmit={async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await upload(formData, params.subjectCode);
        if (result.error) {
          console.log(result.error);
        }
        setLoading(false);
      }}
      className="max-w-[40rem] m-auto grid gap-4"
    >
      <div className="flex items-center gap-4">
        <Link href={`/instructor/subjects/${params.subjectCode}`}>
          <ChevronLeft />
        </Link>
        <h1 className="text-2xl font-bold">Upload Video</h1>
      </div>
      <div>
        <Label htmlFor="file">File</Label>
        <Input id="file" name="file" type="file" accept="video/*" required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type="text" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="h-52"
        />
      </div>
      <SubmitButton subjectCode={params.subjectCode} />
    </form>
  );
}
