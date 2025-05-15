"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/components/uploadthing";
import { useStorage } from "@/hooks/use-storage";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const Trial = () => {
    // HOOKS
    const { fileUrl, setFileUrl, removeFileUrl } = useStorage();

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-wide text-center capitalize leading-tight text-gray-700 dark:text-white">Give it a try</h1>

            <div className="flex items-center justify-center gap-8">
                {
                    fileUrl ? (
                        <div className="z-50 w-[200px] h-[200px] border border-neutral-200 dark:border-neutral-800 rounded-md relative">
                            <Image
                                src={fileUrl}
                                alt="File"
                                width={200}
                                height={200}
                                className="object-contain w-full h-full"
                                unoptimized
                            />
                            <Button variant="secondary" size="icon" className="absolute top-0 right-0">
                                <Trash className="h-4 w-4 text-red-600" />
                            </Button>
                        </div>
                    ) : (
                        <UploadButton
                            endpoint="imageUploader"
                            appearance={{
                                container: "flex flex-col items-center gap-2 p-4 border border-border rounded-lg bg-muted text-foreground w-full",
                                button:
                                    "bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium",
                                allowedContent: "text-xs text-muted-foreground",
                            }}
                            onClientUploadComplete={(res) => {
                                setFileUrl(res?.[0]?.ufsUrl);
                                toast.success("Image uploaded");
                            }}
                            onUploadError={() => {
                                toast.error("Image upload failed");
                            }}
                        />
                    )
                }

                <Image
                    src="/arrow.png"
                    alt="Frame 1"
                    width={80}
                    height={80}
                    className="object-contain text-red-500 z-50"
                />

                <div className="w-[200px] h-[200px] z-50 relative">
                    <Image
                        src="/frame.png"
                        alt="Frame 1"
                        fill
                        className="object-contain rounded-md"
                    />
                    {
                        fileUrl && (
                            <div className="absolute inset-0 w-full h-full z-50 flex items-center justify-center">
                                <Image
                                    src={fileUrl}
                                    alt="Frame 1"
                                    width={100}
                                    height={100}
                                    className="object-contain rounded-md"
                                    unoptimized
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}