"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/authentication/logout";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function logoutUser() {
    startTransition(() => {
      logout().then((response) => {
        const { redirectURL } = response;
        router.push(redirectURL);
      });
    });
  }

  return (
    <button
      onClick={logoutUser}
      className="flex items-center gap-2 p-2 m-0 w-full"
    >
      <LogOut size={16} /> <span>Logout</span>
    </button>
  );
}
