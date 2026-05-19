import { NextResponse } from "next/server";
import { getAllPosts, urlFor, formatDate, readTime } from "@/lib/sanity";

export const revalidate = 60;

export async function GET() {
  try {
    const raw = await getAllPosts();
    const posts = raw.slice(0, 3).map((p) => ({
      id: p._id,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      readTime: readTime(p.body as unknown[]),
      date: formatDate(p.publishedAt),
      coverUrl: p.coverImage
        ? urlFor(p.coverImage).width(800).height(600).url()
        : null,
      slug: p.slug.current,
    }));
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([]);
  }
}
