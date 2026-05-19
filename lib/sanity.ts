import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Sanity está configurado apenas quando o projectId existe no .env.local */
const isConfigured = Boolean(projectId);

export const client = isConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

const builder = isConfigured ? imageUrlBuilder(client!) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return { url: () => "" } as ReturnType<typeof builder.image>;
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

/** All posts ordered by date — retorna [] se Sanity não estiver configurado */
export async function getAllPosts(): Promise<SanityPost[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, author, publishedAt, coverImage
    }`
  );
}

/** Single post by slug — retorna null se Sanity não estiver configurado */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, author, publishedAt, coverImage, body
    }`,
    { slug }
  );
}

/** Slugs de todos os posts para generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!client) return [];
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"]{ slug }`
  );
  return posts.map((p) => p.slug.current);
}

/** Formata datetime ISO → "12 mai. 2025" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Estima tempo de leitura a partir dos blocos do Portable Text */
export function readTime(body: unknown[]): string {
  const text = (body ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((b: any) => b._type === "block")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((b: any) => b.children ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((c: any) => c.text ?? "")
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min de leitura`;
}
