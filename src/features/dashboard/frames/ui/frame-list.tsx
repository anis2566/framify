"use client";

import Image from "next/image";
import { Edit, MoreVerticalIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EmptyStat } from "@/components/empty-stat";
import { CustomPagination } from "@/components/custom-pagination";

import { cn } from "@/lib/utils";
import { useGetFrames } from "../api/use-get-frames";
import { useFrameDelete } from "@/hooks/use-frame";
import { Header } from "./header";

export const FrameList = () => {
    // HOOKS
    const { onOpen: onOpenDelete } = useFrameDelete();

    // QUERY
    const { data, isLoading } = useGetFrames();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Frames</CardTitle>
                <CardDescription>List of all frames</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Header />
                {isLoading ? <FrameSkeleton /> : (
                    <Table>
                        <TableHeader className="bg-accent/80">
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Variants</TableHead>
                                <TableHead>Prices</TableHead>
                                <TableHead>Sizes</TableHead>
                                <TableHead>Colors</TableHead>
                                <TableHead>Stocks</TableHead>
                                <TableHead>Total Sold</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.frames?.map((frame) => (
                                <TableRow key={frame.id}>
                                    <TableCell>
                                        <Image
                                            src={frame.imageUrl}
                                            alt={frame.name}
                                            width={50}
                                            height={50}
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </TableCell>
                                    <TableCell>{frame.name}</TableCell>
                                    <TableCell className="max-w-[150px] truncate">{frame.description}</TableCell>
                                    <TableCell>{frame.variants.length}</TableCell>
                                    <TableCell>
                                        {frame.variants?.map((variant) => variant.price).join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        {frame.variants?.map((variant) => variant.size).join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        {frame.variants?.map((variant) => (
                                            <span key={variant.id} className="inline-block w-4 h-4 rounded-full mr-1" style={{ backgroundColor: variant.color }} />
                                        ))}
                                    </TableCell>
                                    <TableCell>{frame.stock}</TableCell>
                                    <TableCell>{frame.totalSold}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVerticalIcon className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/dashboard/frames/edit/${frame.id}`}
                                                        className="flex items-center gap-x-3"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                        <p>Edit</p>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className={cn(
                                                        "flex items-center gap-x-3 text-rose-500 group",
                                                    )}
                                                    onClick={() => onOpenDelete(frame.id)}
                                                >
                                                    <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                                    <p className="group-hover:text-rose-600">Delete</p>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {data?.frames?.length === 0 && (
                    <EmptyStat title="No frames found" />
                )}
                <CustomPagination totalCount={data?.totalCount} />
            </CardContent>
        </Card>
    )
}


const FrameSkeleton = () => {
    return (
        <Table>
            <TableHeader className="bg-accent/80">
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Variants</TableHead>
                    <TableHead>Prices</TableHead>
                    <TableHead>Sizes</TableHead>
                    <TableHead>Colors</TableHead>
                    <TableHead>Stocks</TableHead>
                    <TableHead>Total Sold</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-full h-10" />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}