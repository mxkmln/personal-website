import Image from 'next/image'
import Exploration from '../components/Exploration'
import Education from '../components/Education'
import Expertise from '../components/Expertise'
import Experiences from '../components/Experiences'
import SocialLinks from '../components/sociallinks'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6">
            <div className="aspect-square w-full relative">
              <Image
               src="/profile.jpg" 
               fill={true} 
               style={{ objectFit: "cover" }} 
               alt="Profile"
              />
            </div>
          </div>
          <div className="flex-grow md:w-3/4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Muskan Rajoria</h1>
            <p className="text-base md:text-lg mb-2">
              Hi I am Muskan. This is my virtual hangout. I am a curious dabbler smitten by a lot of things, most of which you will find captured somewhere in this site. Entrepreneurship and sports excite me a lot. I am cooking something of my own these days. Do reach out if you are a founder looking to chat. I am a recreational climber and I play competitive ultimate frisbee, more on that @ #23. Peace.
            </p>
            <SocialLinks />
          </div>
        </div>
      </section>
      <Exploration />
      <Education />
      <Expertise />
      <Experiences />
      
    </div>
  )
}
