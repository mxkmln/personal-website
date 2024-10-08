export default function Expertise() {
    const skills = [
      'Product Management',
      'Strategy and Market Intel',
      'Operations Design',
      'OKR Governance',
      'Process Excellence'
    ]
  
    return (
      <section className="mb-12">
        <h2 className="text-2xl mb-4">Expertise</h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    )
  }