import { getAllPosts } from '@/lib/api'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getAllPosts(params.category)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{params.category.charAt(0).toUpperCase() + params.category.slice(1)} Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${params.category}/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            {post.date && <p className="text-sm text-gray-600">{post.date}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { category: 'tech' },
    { category: 'non-tech' },
  ]
}