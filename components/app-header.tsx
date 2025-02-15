"use client";

import AppLogoHeader from "./app-logo-header";
import LogoutButton from "./logout-button";
import ProfileButton from "./profile-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppHeader({ headerOnly = false, fixed = false }) {
  const pathname = usePathname();
  const { state, openMobile } = useSidebar();

  // Map of paths to their corresponding titles
  const pathMap: { [key: string]: string } = {
    "/student/dashboard": "Dashboard",
    "/student/courses": "Courses",
    "/student/assessments": "Assessments",
    "/student/learning-resources": "Learning Resources",
    "/student/grades": "Grades",
    "/student/profile": "Profile",
    "/admin/dashboard": "Dashboard",
    "/admin/manage-users": "Users",
    "/admin/manage-courses": "Courses",
    "/admin/profile": "Profile",
  };

  let currentPath =
    Object.keys(pathMap).find((path) => pathname.startsWith(path)) || "";
  currentPath = pathMap[currentPath] || "";

  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const size = isMobile ? 22 : 24;

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full h-14 pl-4 pr-8 transition-all duration-300 z-50",
        state === "collapsed" || isMobile ? "bg-darkGreen-500 text-white" : "",
        fixed === true ? "fixed" : ""
      )}
    >
      <div className="flex items-center gap-4">
        {isMobile ? (
          <>{!headerOnly && <SidebarTrigger />}</>
        ) : (
          <>
            {!headerOnly && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent>Toggle Sidebar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
        <AppLogoHeader
          className={cn(
            "transition-all duration-1000",
            state === "collapsed" || isMobile
              ? "opacity-100"
              : "sr-only opacity-0",
            openMobile && "opacity-0"
          )}
        />
        {state === "expanded" ? (
          <div className="hidden md:block text-xl font-medium">
            {currentPath}
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserRound size={size} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-3 mr-7">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-0">
                <ProfileButton />
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
