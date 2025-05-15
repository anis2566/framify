import { DashboardLayout } from "@/features/dashboard/ui/layout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
