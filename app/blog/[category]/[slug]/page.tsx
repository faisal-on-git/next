import { getPostBySlug, getAllPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import remarkSmartypants from 'remark-smartypants';
import rehypePrettyCode from 'rehype-pretty-code';
import overnight from 'overnight/themes/Overnight-Slumber.json';
import { remarkMdxEvalCodeBlock } from '@/lib/remarkMdxEvalCodeBlock';
import './markdown.css'; 
import { sans } from '@/app/fonts';

overnight.colors["editor.background"] = "var(--code-bg)";

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return <Link {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export async function generateStaticParams() {
  const techPosts = await getAllPosts('tech')
  const nonTechPosts = await getAllPosts('non-tech')
  const allPosts = [...techPosts, ...nonTechPosts]
  
  return allPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { category: string, slug: string } }) {
  const post = await getPostBySlug(params.slug, params.category);

  if (!post) {
    notFound();
  }

  // const discussUrl = `https://x.com/search?q=${encodeURIComponent(
  //   `https://yourdomain.com/blog/${params.category}/${params.slug}/`,
  // )}`;
  // const editUrl = `https://github.com/yourusername/yourrepo/edit/main/public/blog/${params.category}/${encodeURIComponent(
  //   params.slug,
  // )}/index.md`;

  return (
    <article className="mx-auto max-w-2xl">
      <h1
        className={[
          sans.className,
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
          }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkSmartypants,
                [remarkMdxEvalCodeBlock, params.slug],
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
        {/* <hr /> */}
        {/* <p>
          <Link href={discussUrl}>Discuss on 𝕏</Link>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Link href={editUrl}>Edit on GitHub</Link>
        </p> */}
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  const post = await getPostBySlug(params.slug, params.category);
  if (!post) return {};
  return {
    title: `${post.title} — Your Blog Name`,
    description: post.spoiler || post.description,
  };
}