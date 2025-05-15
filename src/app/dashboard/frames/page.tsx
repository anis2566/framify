import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { ContentLayout } from "@/features/dashboard/ui/content-layout";
import { FrameList } from "@/features/dashboard/frames/ui/frame-list";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

const Dashboard = () => {
    return (
        <ContentLayout navChildren={<NavChildren />}>
            <Suspense fallback={<div>Loading...</div>}>
                <FrameList />
            </Suspense>
        </ContentLayout>
    )
};

export default Dashboard;


const NavChildren = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}