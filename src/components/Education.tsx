export default function Education() {
    const education = [
      {
        institution: "Indian Institute of Management, Ahmedabad",
        degree: "Master of Business Administration",
        year: "2017 - 2019"
      },
      {
        institution: "Indian Institute of Technology, Roorkee",
        degree: "Bachelor of Technology",
        year: "2011 - 2015"
      }
    ]
  
    return (
        <section className="mb-12">
          <h2 className="text-2xl mb-4">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg md:text-xl">{edu.institution}</h3>
                <p className="text-sm md:text-base">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )
    }