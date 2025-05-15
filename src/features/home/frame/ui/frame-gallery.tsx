import React from 'react';

import { FormattedFrameWithVariants } from '@/types/frame';

interface FrameGalleryProps {
    frames: FormattedFrameWithVariants[];
    selectedFrame: FormattedFrameWithVariants;
    onSelectFrame: (frame: FormattedFrameWithVariants) => void;
}

const FrameGallery: React.FC<FrameGalleryProps> = ({ frames, selectedFrame, onSelectFrame }) => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Choose a Frame</h3>
            <div className="grid grid-cols-3 gap-3">
                {frames.map((frame) => (
                    <button
                        key={frame.id}
                        className={`relative p-1 border-2 transition-all duration-200 rounded overflow-hidden ${selectedFrame.id === frame.id
                            ? 'border-indigo-600 ring-2 ring-indigo-200'
                            : 'border-gray-200 hover:border-indigo-400'
                            }`}
                        onClick={() => onSelectFrame(frame)}
                    >
                        <div className="aspect-square w-full overflow-hidden">
                            <img
                                src={frame.imageUrl}
                                alt={frame.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="block text-xs mt-1 text-center text-gray-600">
                            {frame.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FrameGallery