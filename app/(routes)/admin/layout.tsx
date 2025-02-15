import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Persist the sidebar state across page reloads and server-side rendering
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar userType="admin" />
      <main className="w-full">
        <AppHeader />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
