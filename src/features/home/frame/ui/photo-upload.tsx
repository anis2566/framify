import React, { useState, useCallback } from 'react';
import { Upload, Image } from 'lucide-react';

interface PhotoUploadProps {
    onPhotoUpload: (photoDataUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

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
    }, [onPhotoUpload]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            processFile(file);
        }
    }, [onPhotoUpload]);

    const processFile = (file: File) => {
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
                onPhotoUpload(e.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="space-y-4">
                <div className="mx-auto h-16 w-16 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                    {isDragging ? (
                        <Image className="h-8 w-8" />
                    ) : (
                        <Upload className="h-8 w-8" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-medium">
                        {isDragging ? 'Drop your photo here' : 'Upload your photo'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Drop your image here, or click to select a file
                    </p>
                </div>
                <label className="inline-block">
                    <span className="px-4 py-2 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 cursor-pointer transition-colors">
                        Select File
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileInput}
                    />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                    Supports JPG, PNG up to 10MB
                </p>
            </div>
        </div>
    );
};

export default PhotoUpload;