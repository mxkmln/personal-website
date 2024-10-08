import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
}

export default function BlogPage() {
  const posts = getPosts()
  const postsByYear = groupPostsByYear(posts)
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {sortedYears.map((year) => (
        <div key={year} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{year}</h2>
          <ul className="space-y-4">
            {postsByYear[year].map((post) => (
              <li key={post.slug}>
                <div className="flex justify-between items-baseline mb-1">
                  <Link href={`/Blog/${post.slug}`} className="text-xl font-semibold hover:text-blue-600">
                    {post.title}
                  </Link>
                  <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
                </div>
                <p className="text-gray-600">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  return posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<string, Post[]>)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}