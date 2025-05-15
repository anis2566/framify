import React, { useRef, useEffect } from 'react';

import { FormattedFrame } from '@/types/frame';

interface FramePreviewProps {
    photo: string;
    frame: FormattedFrame;
    zoom: number;
    position: { x: number; y: number };
    frameColor: string;
}

const FramePreview: React.FC<FramePreviewProps> = ({
    photo,
    frame,
    zoom,
    position,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            setDragging(true);
            setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            const newX = e.clientX - startPosition.x;
            const newY = e.clientY - startPosition.y;
            position.x = newX;
            position.y = newY;
            container.style.setProperty('--x', `${newX}px`);
            container.style.setProperty('--y', `${newY}px`);
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, position, startPosition]);

    const photoStyle: React.CSSProperties = {
        transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
        transition: dragging ? 'none' : 'transform 0.2s ease-out',
        cursor: dragging ? 'grabbing' : 'grab',
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-medium">Frame Preview</h2>
                <p className="text-gray-500 text-sm">Adjust position by dragging the photo</p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto">
                <div
                    ref={containerRef}
                    className="relative overflow-hidden"
                    style={{
                        width: '100%',
                        height: '250px',
                        maxWidth: '215px',
                        margin: '0 auto',
                        backgroundImage: `url(${frame.imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    }}
                >
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${photo})`,
                            backgroundSize: `${zoom * 100}%`,
                            ...photoStyle
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FramePreview;