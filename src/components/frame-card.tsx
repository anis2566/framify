import Image from "next/image"
import { Rating } from "@smastrom/react-rating";

import { Separator } from "./ui/separator";

import { formatPriceBD } from "@/lib/utils"

export const FrameCard = () => {
    return (
        <div className="shadow-md rounded-lg overflow-hidden p-4 hover:shadow-2xl hover:scale-102 hover:shadow-primary/40 transition-all duration-300 space-y-2">
            <div className="relative aspect-square h-[200px]">
                <Image
                    src="/frame.png"
                    alt="Frame 1"
                    fill
                    className="object-fit rounded-lg"
                />
            </div>
            <div>
                <h4 className="text-md font-bold line-clamp-2 max-w-[200px]">Wooden Frame</h4>
                <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                <Separator className="my-2" />
                <p className="text-sm text-muted-foreground">12&quot; x 12&quot; Inch</p>
                <p className="text-sm font-semibold">{formatPriceBD(1000)}</p>
            </div>
        </div>
    )
}
