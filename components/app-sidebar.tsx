import {
  LayoutDashboard,
  Book,
  Info,
  User,
  Pencil,
  ChartNoAxesColumn,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AppLogoHeader from "@/components/app-logo-header";

// ================================== Admin Sidebar ==================================
// Menu items for home
const adminHome = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

// Menu items for administration
const adminAdministration = [
  {
    title: "Courses",
    url: "/admin/manage-courses",
    icon: Book,
  },
  {
    title: "Users",
    url: "/admin/manage-users",
    icon: User,
  },
];

// ================================== Student Sidebar ==================================
// Menu items for academics
const studentAcademics = [
  {
    title: "Courses",
    url: "/student/courses",
    icon: Book,
  },
  {
    title: "Assessments",
    url: "/student/assessments",
    icon: Pencil,
  },
];

// Menu items for records
const studentRecords = [
  {
    title: "Grades",
    url: "/student/grades",
    icon: ChartNoAxesColumn,
  },
];

interface AppSidebarProps {
  userType: "student" | "admin" | "instructor";
}

export function AppSidebar({ userType }: AppSidebarProps) {
  if (userType === "student") {
    return <StudentSidebar />;
  } else if (userType === "admin") {
    return <AdminSidebar />;
  }
}

function StudentSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 bg-darkGreen-500 text-white">
        <AppLogoHeader />
      </SidebarHeader>
      <SidebarContent className="px-2 bg-darkGreen-500 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Academics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentAcademics.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Records
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentRecords.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="hidden md:flex bg-darkGreen-500 text-white">
        <div className="flex items-center justify-center gap-x-[.3rem] text-sm text-gray-500  mb-4">
          <Info size={16} />
          Toggle Sidebar: Ctrl + B
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 bg-darkGreen-500 text-white">
        <AppLogoHeader />
      </SidebarHeader>
      <SidebarContent className="px-2 bg-darkGreen-500 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminHome.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminAdministration.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="hidden md:flex bg-darkGreen-500 text-white">
        <div className="flex items-center justify-center gap-x-[.3rem] text-sm text-gray-500  mb-4">
          <Info size={16} />
          Toggle Sidebar: Ctrl + B
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
