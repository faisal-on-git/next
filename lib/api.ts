import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "public", "blog");

export async function getAllPosts(category?: string) {
  const categoryDirectory = category
    ? path.join(contentDirectory, category)
    : contentDirectory;

  try {
    const folders = await fs.readdir(categoryDirectory, {
      withFileTypes: true,
    });
    const postFolders = folders.filter((dirent) => dirent.isDirectory());

    const posts = await Promise.all(
      postFolders.map(async (folder) => {
        const slug = folder.name;
        const fullPath = path.join(categoryDirectory, slug, "index.md");
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          category: category || "uncategorized",
          ...data,
          content,
        };
      })
    );

    return posts.sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );
  } catch (error) {
    console.error(`Error reading posts from ${categoryDirectory}:`, error);
    return [];
  }
}

export async function getPostBySlug(slug: string, category: string) {
  const fullPath = path.join(contentDirectory, category, slug, "index.md");
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      category,
      content,
      ...data,
    } as PostData;
  } catch (error) {
    console.error(`Error reading ${fullPath}:`, error);
    return null;
  }
}

export interface PostData {
  slug: string;
  category: string;
  title: string;
  date: string;
  content: string;
  spoiler?: string;
  description?: string;
  [key: string]: any;
}
