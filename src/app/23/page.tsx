import Image from 'next/image'
import ImageGallery from './ImageGallery'

export const metadata = {
  title: '#23 | Your Name',
  description: 'Insights and thoughts from my 23rd year',
}

export default function TwentyThreePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">#23</h1>
      <p className="mb-12">
        This page is dedicated to experiences, and reflections from my career as an athlete. I proudly wear jersey #23.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">International Tournaments</h2>
      <p className="mb-8">
        I have had the opportunity to represent India at Asia Oceamic Ultimate and Guts Championship 2023, Junior Masters Ultimate Championship 2023 and Nusantara Cup, Bali 2024. It has been an immense pleasure to play for the country and meet my fellow ultimate frisbee athletes from around the world.
      </p>
      
      <div className="mb-16">
        <ImageGallery />
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Club Ultimate</h2>
      <p className="mb-8">
        I play with my club team called Learning to fly. It is the oldest Frisbee club based out of Bangalore.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
          <Image
            src="/23/image4.jpg"
            alt="National Image 1"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300 filter grayscale hover:grayscale-0"
          />
        </div>
        <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
          <Image
            src="/23/image5.jpg"
            alt="National Image 2"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300 filter grayscale hover:grayscale-0"
          />
        </div>
        <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
          <Image
            src="/23/image6.jpg"
            alt="National Image 3"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300 filter grayscale hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  )
}