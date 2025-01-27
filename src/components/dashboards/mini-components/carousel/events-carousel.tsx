"use client";

import type { EventProp } from "@/types/dashboard";

import { useState } from "react";

// Importing components.
import { motion, AnimatePresence } from "framer-motion";
import CarouselCard from "./carousel-card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
    }),
};

export default function EventsCarousel({
    events,
    eventsCount,
}: {
    events: EventProp[];
    eventsCount: number;
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [];

    for (let i = 0; i < events.length; i += 3) {
        slides.push(events.slice(i, i + 3));
    }

    const handlePrev = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col gap-2 overflow-hidden bg-none">
            <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full bg-none"
                    >
                        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 bg-none">
                            {slides[currentSlide].map((slide, index) => (
                                <div key={index} className="w-full bg-none">
                                    <CarouselCard
                                        delay={index / 10}
                                        event={slide}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between items-center">
                <div className="ml-1 text-sm text-gray-500">
                    Showing {currentSlide + 1} of {Math.ceil(eventsCount / 3)}
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="bg-muted border p-3 rounded-full text-primary/60 cursor-pointer"
                        onClick={handlePrev}
                        aria-label="Previous slide"
                    >
                        <FaArrowLeft />
                    </div>

                    <div
                        className="bg-muted border p-3 rounded-full text-primary/60 cursor-pointer"
                        onClick={handleNext}
                        aria-label="Next slide"
                    >
                        <FaArrowRight />
                    </div>
                </div>
            </div>
        </div>
    );
}
