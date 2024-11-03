import Link from "next/link";
import { getAllPosts, PostData } from "@/lib/api";
import QuoteDisplay from "@/components/QuoteDisplay";
import RecentBlogPosts from "@/components/RecentBlogPost";

export default async function Home() {
  const techPosts = await getAllPosts("tech");
  const nonTechPosts = await getAllPosts("non-tech");
  const recentPosts = [...techPosts, ...nonTechPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <QuoteDisplay />
      {/* <h1 className="text-4xl font-bold mb-6">
        Welcome to My Blog & Portfolio
      </h1> */}
<section className="mb-12 w-full">
  <h2 className="text-2xl font-semibold mb-4">About Me</h2>
  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
    Hi, I'm Faisal, a software engineer by profession. This blog is my
    platform to explore and discuss the realms of technology, philosophy,
    poetry, and anything else that sparks my curiosity.
  </p>
      </section>
      <section>
        {/* <h2 className="text-2xl font-semibold mb-4">Recent Blog Posts</h2> */}
        {recentPosts.length > 0 ? (
          <ul className="space-y-4">
            {/* {recentPosts.map((post: PostData) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.category}/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                {post.date && (
                  <p className="text-sm text-gray-600">{post.date}</p>
                )}
              </li>
            ))} */}
            <RecentBlogPosts posts={recentPosts} />
          </ul>
        ) : (
          <p>No blog posts found.</p>
        )}
      </section>
    </div>
  );
}
