import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { ContentLayout } from "@/features/dashboard/ui/content-layout";
import { db } from "@/lib/db";
import { EditFrameForm } from "@/features/dashboard/frames/ui/edit-frame-form";

export const metadata: Metadata = {
    title: "Dashboard | Frames | Edit",
    description: "Edit Frames",
};

interface Props {
    params: Promise<{ id: string }>
}

const EditFrame = async ({ params }: Props) => {
    const { id } = await params;

    const frame = await db.frame.findUnique({
        where: {
            id,
        },
        include: {
            variants: true,
        },
    })

    if (!frame) return redirect("/dashboard/frames");

    return (
        <ContentLayout navChildren={<NavChildren />}>
            <EditFrameForm frame={frame} />
        </ContentLayout>
    )
}

export default EditFrame;

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
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard/frames">
                            Frames
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
