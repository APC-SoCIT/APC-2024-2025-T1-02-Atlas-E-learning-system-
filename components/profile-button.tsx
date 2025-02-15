"use client";

import { User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileButton() {
  const pathname = usePathname();
  const router = useRouter();
  let user = "";

  if (pathname.startsWith("/student")) {
    user = "student";
  } else if (pathname.startsWith("/instructor")) {
    user = "instructor";
  } else if (pathname.startsWith("/admin")) {
    user = "admin";
  }

  return (
    <button
      onClick={() => router.push(`/${user}/profile`)}
      className="flex items-center gap-2 p-2 m-0 w-full"
    >
      <User size={16} />
      View Profile
    </button>
  );
}
