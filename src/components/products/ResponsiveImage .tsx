"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

type ImageType = {
    src: string;
    alt: string;
};

type CarouselProps = {
    images: ImageType[];
    autoplayInterval?: number;
};

const Carousel = ({ images, autoplayInterval = 3000 }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplayInterval, images.length]);

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrev(),
    });

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div {...handlers} className="relative w-full mb-4 overflow-hidden">
            <div className="relative w-full h-[20vh] sm:h-[40vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="w-full h-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                layout="fill"
                                objectFit="cover"
                                quality={90}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-64 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 md:h-3.5 md:w-3.5 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
