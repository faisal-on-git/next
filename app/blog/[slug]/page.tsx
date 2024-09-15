import { getPostBySlug, getAllPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import remarkSmartypants from 'remark-smartypants';
import rehypePrettyCode from 'rehype-pretty-code';
import overnight from 'overnight/themes/Overnight-Slumber.json';
import { remarkMdxEvalCodeBlock } from '@/lib/remarkMdxEvalCodeBlock'; // Import the new plugin
import './markdown.css'; 
import { sans } from '@/app/fonts';

overnight.colors["editor.background"] = "var(--code-bg)";

// Add this custom component
const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return <Link {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const discussUrl = `https://x.com/search?q=${encodeURIComponent(
    `https://yourdomain.com/blog/${params.slug}/`,
  )}`;
  const editUrl = `https://github.com/yourusername/yourrepo/edit/main/public/${encodeURIComponent(
    params.slug,
  )}/index.md`;

  return (
    <article className="mx-auto max-w-2xl">
      {/* <h1>{post.title}</h1> */}
      <h1
        className={[
          // sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        {post.title}
      </h1>
      {post.date && (
              <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">

          {new Date(post.date).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      <div className="markdown mt-10">
        <MDXRemote
          source={post.content || ''}
          components={{
            a: CustomLink,
            // Add any custom components here
          }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkSmartypants,
                [remarkMdxEvalCodeBlock, params.slug], // Pass the slug as filename
              ],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: overnight,
                  },
                ],
              ],
            },
          }}
        />
        <hr />
        <p>
          <Link href={discussUrl}>Discuss on 𝕏</Link>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Link href={editUrl}>Edit on GitHub</Link>
        </p>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Your Blog Name`,
    description: post.spoiler || post.description,
  };
}