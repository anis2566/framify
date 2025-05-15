import { AppSidebar } from "./app-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
};
// 