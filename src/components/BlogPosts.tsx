import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Post {
  title: string
  date: string
  link: string
  excerpt?: string
}

export default function BlogPosts() {
  const posts = getPosts()

  return (
    <section className="max-w-5xl mx-auto px-2 py-8"> {/* Adjusted width and padding for wider layout */}
      <h2 className="text-4xl font-bold mb-8">Blog</h2> {/* Main title */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b">
            <Link href={post.link} className="text-lg font-semibold hover:text-blue-600 truncate">
              {post.title}
            </Link>
            <span className="text-sm text-gray-600 ml-4 flex-shrink-0">{post.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// Helper function to load posts from Markdown files
function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      title: data.title,
      date: data.date,
      link: `/blog/${slug}`, // Adjust this as needed to match your routing
      excerpt: data.excerpt,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
