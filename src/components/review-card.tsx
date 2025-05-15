"use client";

import { Rating } from "@smastrom/react-rating";
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Review {
    id: number;
    name: string;
    designation: string;
    image: string;
    rating: number;
    review: string;
    date: string;
}

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <div className="border border-muted rounded-lg p-4 max-w-[350px]">
            <div className="flex gap-2">
                <div className="flex-srink-0">
                    <Avatar>
                        <AvatarImage src={review.image} />
                        <AvatarFallback>
                            {review.name[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between">
                        <div>
                            <h3>{review.name}</h3>
                            <Rating style={{ maxWidth: 70 }} value={review.rating} readOnly />
                        </div>
                        <p className="text-sm text-muted-foreground">{format(review.date, "MMM d, yyyy")}</p>
                    </div>

                    <p className="line-clamp-4 text-start">{review.review}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
