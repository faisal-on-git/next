"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  category: string;
}

interface RecentBlogPostsProps {
  posts: PostData[];
}

const defaultImage = "/bookDefaultImage.jpeg";

export default function RecentBlogPosts({ posts = [] }: RecentBlogPostsProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No blog posts found.</p>
    );
  }

  return (
    <div className="my-12 px-4 md:px-8 lg:px-12">
      <h2 className="text-3xl font-semibold mb-6 text-foreground">
        Recent Blog Posts
      </h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {posts.map((post, index) => (
            <CarouselItem
              key={`${post.slug}-${index}`}
              className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <Card key={`${post.slug}-${index}`} className="h-full">
                <Link href={`/blog/${post.category}/${post.slug}`}>
                  <CardHeader className="p-0">
                    <div className="relative h-40 w-full">
                      <Image
                        src={post.coverImage || defaultImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">
                      {post.date}
                    </p>
                    <p className="text-sm line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <p className="text-sm text-primary">Read more →</p>
                  </CardFooter>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 md:-left-12 hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="absolute right-0 md:-right-12 hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
    </div>
  );
}

RecentBlogPosts.defaultProps = {
  posts: [
    {
      slug: "default-post-1",
      title: "Default Blog Post 1",
      date: "2023-06-01",
      excerpt: "This is a default excerpt for the first blog post...",
      coverImage: "/placeholder.svg?height=160&width=288",
    },
    {
      slug: "default-post-2",
      title: "Default Blog Post 2",
      date: "2023-06-02",
      excerpt: "This is a default excerpt for the second blog post...",
      coverImage: "/placeholder.svg?height=160&width=288",
    },
    {
      slug: "default-post-3",
      title: "Default Blog Post 3",
      date: "2023-06-03",
      excerpt: "This is a default excerpt for the third blog post...",
      coverImage: "/placeholder.svg?height=160&width=288",
    },
    {
      slug: "default-post-4",
      title: "Default Blog Post 4",
      date: "2023-06-04",
      excerpt: "This is a default excerpt for the fourth blog post...",
      coverImage: "/placeholder.svg?height=160&width=288",
    },
  ],
};
