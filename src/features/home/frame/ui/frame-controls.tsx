import React from 'react';
import {
    ZoomIn,
    ZoomOut,
    MoveHorizontal,
    Palette,
    Frame,
} from 'lucide-react';

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FrameControlsProps {
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    position: { x: number; y: number };
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    frameColor: string;
    setFrameColor: React.Dispatch<React.SetStateAction<string>>;
    colors: string[];
    sizes: string[];
    selectedSize: string;
    setFrameSize: React.Dispatch<React.SetStateAction<string>>;
}

const FrameControls: React.FC<FrameControlsProps> = ({
    zoom,
    setZoom,
    position,
    setPosition,
    frameColor,
    setFrameColor,
    colors,
    sizes,
    selectedSize,
    setFrameSize,
}) => {
    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 0.5));
    };

    const handleHorizontalPositionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newX = Number(e.target.value);
        setPosition((prev) => ({ ...prev, x: newX }));
    };

    return (
        <div className="space-y-6 mt-6">
            {/* Zoom controls */}
            <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                    <ZoomIn className="w-4 h-4 mr-1" /> Zoom & Position
                </h3>
                <div className="flex items-center space-x-4">
                    <button
                        className="p-2 rounded-full bg-muted transition-colors"
                        onClick={handleZoomOut}
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <div className="flex-grow bg-gray-200 h-2 rounded-full">
                        <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: `${((zoom - 0.5) / 1.5) * 100}%` }}
                        />
                    </div>
                    <button
                        className="p-2 rounded-full bg-muted transition-colors"
                        onClick={handleZoomIn}
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Drag or use sliders to position the photo inside the frame.
                </p>
            </div>

            {/* Horizontal position control */}
            <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                    <MoveHorizontal className="w-4 h-4 mr-1" /> Photo Position (Left–Right)
                </h3>
                <input
                    type="range"
                    min="-200"
                    max="200"
                    value={position.x}
                    onChange={handleHorizontalPositionChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Left</span>
                    <span>Center</span>
                    <span>Right</span>
                </div>
            </div>

            {/* Frame color selection */}
            <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Palette className="w-4 h-4 mr-1" /> Frame Color
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            className={`w-6 h-6 rounded-full border ${frameColor === color
                                ? 'ring-2 ring-indigo-300 border-indigo-600'
                                : 'border-gray-300'
                                }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setFrameColor(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            {/* Frame size selection */}
            <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Frame className="w-4 h-4 mr-1" /> Frame Size
                </h3>
                <RadioGroup defaultValue="option-one">
                    {
                        sizes.map((size, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={size} id={size} checked={selectedSize === size} onChange={() => setFrameSize(size)} />
                                <Label htmlFor={size}>{size}</Label>
                            </div>
                        ))
                    }
                </RadioGroup>

            </div>
        </div>
    );
};

export default FrameControls;
