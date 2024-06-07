"use client"
import Image from 'next/image';
import { useState } from 'react';


interface Props {
    images: string[];
}

    export const ThumbsGallery = ({ images }: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className=" flex items-center justify-center">
                <Image src={`/products/${images[selectedImage]}`} alt="Selected Image" className="rounded-lg md:max-w-md lg:max-w-lg xl:max-w-xl" width={1024} height={800} />
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center space-x-2">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        src={`/products/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-16 h-16 object-cover border-2 cursor-pointer ${selectedImage === index ? 'border-indigo-700' : 'border-transparent'}`}
                        width={1024} 
                        height={800}
                    />
                ))}
            </div>
        </div>
    );
}

