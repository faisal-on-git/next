import Link from "next/link";
import { getAllPosts, PostData } from "@/lib/api";

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Welcome to My Blog & Portfolio</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p>
          Hello! I'm [Your Name], a [your profession] passionate about [your interests].
          This is my personal space where I share my thoughts on technology, philosophy,
          and everything in between.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Blog Posts</h2>
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {recentPosts.map((post: PostData) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title || post.slug}
                </Link>
                {post.date && <p className="text-sm text-gray-600">{post.date}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blog posts found.</p>
        )}
      </section>
    </div>
  );
}
