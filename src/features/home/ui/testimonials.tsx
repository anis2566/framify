"use client";

import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import ReviewCard from "@/components/review-card";

const dummyReviews = [
    {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        rating: 4.5,
        review: "I love the quality of the frames and the customization options. The team was very accommodating and the turnaround time was impressive.",
        date: "2025-01-01",
    },
    {
        id: 2,
        name: "Jane Doe",
        designation: "Product Manager",
        image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        rating: 5,
        review: "Framify has exceeded my expectations. The frames are stunning and the customization options are endless. I would recommend this company to anyone looking for a unique and personalized gift.",
        date: "2025-02-01",
    },
    {
        id: 3,
        name: "Robert Johnson",
        designation: "Data Scientist",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        rating: 4,
        review: "I was amazed by the quality of the frames and the customization options. The team was prompt and efficient, and the turnaround time was impressive.",
        date: "2025-03-01",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        rating: 4.5,
        review: "Framify has exceeded my expectations. The frames are stunning and the customization options are endless. I would recommend this company to anyone looking for a unique and personalized gift.",
        date: "2025-04-01",
    },
    {
        id: 5,
        name: "Tyler Durden",
        designation: "Soap Developer",
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        rating: 5,
        review: "I love the quality of the frames and the customization options. The team was very accommodating and the turnaround time was impressive.",
        date: "2025-05-01",
    },
];

export const Testimonials = () => {
    return (
        <div className="container w-full max-w-7xl mx-auto py-20 flex flex-col items-center gap-10">
            <div>
                <h1 className="text-4xl font-bold tracking-wide text-center capitalize leading-tight text-gray-700 dark:text-white">What our customers say</h1>

                <p className="text-sm text-center text-muted-foreground max-w-xl mx-auto">
                    Hear from our satisfied customers who have transformed their memories into masterpieces with Framify.
                </p>
            </div>

            <Carousel className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {dummyReviews.map((review, index) => (
                        <CarouselItem key={index} className="basis-1/1 md:basis-1/4">
                            <ReviewCard review={review} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2" />
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2" />
            </Carousel>
        </div>
    )
}
