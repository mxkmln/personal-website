import Link from 'next/link'

export default function BlogPosts() {
  const posts = [
    { title: "What's the use of AI in EdTech?", date: '2024-03-01', link: '/blog/ai-in-edtech' },
    { title: 'The future of remote work', date: '2024-02-15', link: '/leisure/future-of-remote-work' },
    { title: 'Product Management best practices', date: '2024-01-30', link: '/blog/product-management-best-practices' }
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl mb-4">Recent blog posts</h2>
      <div className="space-y-2">
        {posts.map((post, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b">
            <Link href={post.link} className="text-lg hover:text-blue-600 truncate">
              {post.title}
            </Link>
            <span className="text-sm text-gray-600 ml-4 flex-shrink-0">{post.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}