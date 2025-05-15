"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import PhotoUpload from "./photo-upload";
import FramePreview from "./frame-preview";
import { useGetFrames } from "../api/use-get-frames-for-build";
import { FormattedFrameWithVariants } from "@/types/frame";
import FrameGallery from "./frame-gallery";
import FrameControls from "./frame-controls";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export const FrameBuilder = () => {
    // STATES
    const [photo, setPhoto] = useState<string | null>(null);
    const [selectedFrame, setSelectedFrame] = useState<FormattedFrameWithVariants | null>(null);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [frameColor, setFrameColor] = useState("#000000");
    const [frameSize, setFrameSize] = useState("");

    // HOOKS
    const searchParams = useSearchParams();
    const photoUrl = searchParams.get("photo");
    const { addToCart } = useCart();

    // QUERY
    const { data } = useGetFrames();

    // SELECT FRAME ON LOAD
    useEffect(() => {
        if (data?.frames?.length) {
            setSelectedFrame(data.frames[0]);
        }
    }, [data]);

    useEffect(() => {
        if (photoUrl) {
            setPhoto(photoUrl);
        }
    }, [photoUrl]);

    // HANDLE PHOTO UPLOAD
    const handlePhotoUpload = (photoDataUrl: string) => {
        setPhoto(photoDataUrl);
    };

    // HANDLE FRAME SELECT
    const handleFrameSelect = (frame: FormattedFrameWithVariants) => {
        setSelectedFrame(frame);
    };

    // HANDLE ADD TO CART
    const handleAddToCart = () => {
        if (selectedFrame) {
            addToCart({
                frame: selectedFrame,
                quantity: 1,
            });
            toast.success("Frame added to cart");
        }
    };

    return (
        <div className="max-w-7xl mx-auto" >
            <div className="bg-background overflow-hidden">
                <div className="md:flex md:items-start">
                    <div className="md:w-3/5 p-6">
                        {!photo ? (
                            <PhotoUpload onPhotoUpload={handlePhotoUpload} />
                        ) :
                            selectedFrame ? (
                                <FramePreview
                                    photo={photo}
                                    frame={selectedFrame}
                                    zoom={zoom}
                                    position={position}
                                    frameColor={frameColor}
                                />
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </div>
                    <div className="md:w-2/5 p-6">
                        {photo && (
                            <>
                                <h2 className="text-lg font-medium">Customize Your Frame</h2>
                                <p className="text-sm text-muted-foreground mb-4">Your photo will be well edited to fit the frame.</p>
                                {
                                    selectedFrame && (
                                        <FrameGallery
                                            frames={data?.frames?.slice(0, 3) || []}
                                            selectedFrame={selectedFrame}
                                            onSelectFrame={handleFrameSelect}
                                        />
                                    )
                                }
                                <FrameControls
                                    zoom={zoom}
                                    setZoom={setZoom}
                                    position={position}
                                    setPosition={setPosition}
                                    frameColor={selectedFrame?.variants[0]?.color || frameColor}
                                    setFrameColor={setFrameColor}
                                    colors={selectedFrame?.variants.map((variant) => variant.color) || []}
                                    sizes={selectedFrame?.variants.map((variant) => variant.size) || []}
                                    selectedSize={selectedFrame?.variants[0]?.size || frameSize}
                                    setFrameSize={setFrameSize}
                                />

                                <Button className="w-full max-w-[250px] mt-6" onClick={handleAddToCart} asChild>
                                    <Link href="/order">
                                        <ShoppingCart className="w-4 h-4 ml-2" />
                                        <span>Order Frame</span>
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
