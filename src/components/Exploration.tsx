export default function Exploration() {
  const interests = ['AI', 'B2B SaaS', 'Bharat', 'Automation', 'Retail']

  return (
    <section className="mb-12">
      <h2 className="text-2xl mb-4 font-bold">Exploration</h2>
      <p className="mb-4 text-sm md:text-base">
        Looking to build a company at the crossover of tech and ops. Particularly interested in India-focused businesses and how best to leverage tech for that. Love to discuss ideas around offline-first businesses and B2B SaaS focusing on AI-led automation. Also studying scientific philosophy on the side.
      </p>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span 
            key={index} 
            className="bg-gray-200 rounded-full px-3 py-1 text-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  )
}