"use client";

import { genUploader } from "uploadthing/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Image, Upload, Loader2 } from "lucide-react";

import { uploadRouter } from "@/lib/uploadthing";

export const Trial = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { uploadFiles } = genUploader<typeof uploadRouter>();

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            processFile(file);
        }
    }, []);

    const processFile = async (file: File) => {
        if (!file.type.match("image.*")) {
            alert("Please select an image file");
            return;
        }

        try {
            setIsLoading(true);

            const response = await uploadFiles("imageUploader", {
                files: [file],
            });

            if (response[0].ufsUrl) {
                router.push(`/frames/build?photo=${response[0].ufsUrl}`);
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Something went wrong while uploading");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold tracking-wide text-center capitalize leading-tight text-gray-700 dark:text-white">
                    Give it a try
                </h1>
                <p className="text-sm text-center text-muted-foreground">
                    Upload your photo and see how it looks in a frame. If you like it, you can place an order.
                </p>
            </div>

            <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="space-y-4">
                    <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                        {isLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                        ) : isDragging ? (
                            <Image className="h-8 w-8" />
                        ) : (
                            <Upload className="h-8 w-8" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">
                            {isLoading
                                ? "Uploading photo..."
                                : isDragging
                                    ? "Drop your photo here"
                                    : "Upload your photo"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Drop your image here, or click to select a file
                        </p>
                    </div>

                    <label className="inline-block">
                        <span
                            className={`px-4 py-2 rounded bg-indigo-600 text-white text-sm font-medium transition-colors ${isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-indigo-700 cursor-pointer"
                                }`}
                        >
                            {isLoading ? "Uploading..." : "Select File"}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileInput}
                            disabled={isLoading}
                        />
                    </label>

                    <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG up to 10MB</p>
                </div>
            </div>
        </div>
    );
};
