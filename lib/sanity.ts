import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── Queries ──────────────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  coverImage: SanityImageSource;
  body: unknown[];
}

/** All posts ordered by date (for listing) */
export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, author, publishedAt, coverImage
    }`
  );
}

/** Single post by slug (for post page) */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, author, publishedAt, coverImage, body
    }`,
    { slug }
  );
}

/** Slugs of all posts (for generateStaticParams) */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"]{ slug }`
  );
  return posts.map((p) => p.slug.current);
}

/** Helper: format Sanity datetime → "12 Mai 2025" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Read time estimate from body blocks */
export function readTime(body: unknown[]): string {
  const text = (body ?? [])
    .filter((b: any) => b._type === "block")
    .flatMap((b: any) => b.children ?? [])
    .map((c: any) => c.text ?? "")
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min de leitura`;
}
