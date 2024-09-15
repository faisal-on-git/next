import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public');

export async function getAllPosts() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
  const directories = entries.filter(entry => entry.isDirectory());

  const allPosts = await Promise.all(
    directories.map(async dir => {
      const fullPath = path.join(postsDirectory, dir.name, 'index.md');
      try {
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug: dir.name,
          ...data,
        } as PostData;
      } catch (error) {
        console.error(`Error reading ${fullPath}:`, error);
        return null;
      }
    })
  );

  return allPosts
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => ((a.date ?? '') > (b.date ?? '') ? -1 : 1));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
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
  title?: string;
  date?: string;
  content?: string;
  spoiler?: string;
  description?: string;
  [key: string]: any;
}