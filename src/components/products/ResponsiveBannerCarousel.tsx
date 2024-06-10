"use client"

import { useState, useEffect, useRef } from 'react';

const images: { src: string, alt: string }[] = [
    { src: '/banner/1.jpg', alt: 'Slide 1' },
    { src: '/banner/2.jpg', alt: 'Slide 2' },
    { src: '/banner/3.jpg', alt: 'Slide 3' },
    { src: '/banner/4.jpg', alt: 'Slide 4' }
];

const AutoPlayCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const startX = useRef<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000); // Cambia cada 4 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, []);

    const handleTouchStart = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        startX.current = touch.clientX;
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (!startX.current) return;

        const touch = event.touches[0];
        const diffX = startX.current - touch.clientX;

        if (diffX > 50) {
            // Desliza a la izquierda
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            startX.current = null;
        } else if (diffX < -50) {
            // Desliza a la derecha
            setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            startX.current = null;
        }
    };

    const handleTouchEnd = () => {
        startX.current = null;
    };

    return (
        <div
            className="relative w-full overflow-hidden mb-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="carousel w-full">
                {images.map((image, index) => (
                    <div key={index} className={`carousel-item relative w-full  ${currentSlide === index ? 'block' : 'hidden'}`}>
                        <img src={image.src} alt={image.alt} className="w-full" />
                    </div>
                ))}
            </div>
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center items-center p-5 md:p-10 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 mt-72 md:w-3 md:h-3 mx-1  rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
            
        </div>
    );
};

export default AutoPlayCarousel;