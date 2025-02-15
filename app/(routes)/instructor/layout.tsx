import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persist the sidebar state across page reloads and server-side rendering

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar userType="instructor" />
      <main className="w-full">
        <AppHeader headerOnly={true} fixed={true} />
        <div className="p-4 pt-16">{children}</div>
      </main>
    </SidebarProvider>
  );
}
