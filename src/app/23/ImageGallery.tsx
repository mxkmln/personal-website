'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const images = [
  { src: '/23/image1.jpg', alt: 'Image 1' },
  { src: '/23/image2.jpg', alt: 'Image 2' },
  { src: '/23/image3.jpg', alt: 'Image 3' },
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    window.addEventListener('keydown', handleEsc)

    // Preload images
    images.forEach((image) => {
      const img = document.createElement('img')
      img.src = image.src
    })

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] cursor-pointer overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-300 filter grayscale hover:grayscale-0"
              onClick={() => setSelectedImage(image.src)}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-4xl max-h-4xl">
            <button
              className="absolute top-4 right-4 text-white z-10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X size={24} />
            </button>
            <Image
              src={selectedImage}
              alt="Full size image"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}