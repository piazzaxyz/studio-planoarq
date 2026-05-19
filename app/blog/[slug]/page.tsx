import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllPosts,
  urlFor,
  formatDate,
  readTime,
  type SanityPost,
} from "@/lib/sanity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return { title: `${post.title} | Plano Arq`, description: post.excerpt };
  } catch {
    return {};
  }
}

// Portable Text renderers — maps Sanity block types to styled JSX
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-stone-600 leading-[1.9] text-[16px] mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl lg:text-3xl font-light text-stone-900 mt-14 mb-5 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-light text-stone-900 mt-10 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-stone-300 pl-6 my-8 font-serif text-xl text-stone-500 italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-stone-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.caption ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        {value.caption && (
          <figcaption className="text-xs text-stone-400 text-center mt-3 tracking-wide">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post: SanityPost | null = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  let related: SanityPost[] = [];
  try {
    const all = await getAllPosts();
    related = all.filter((p) => p.slug.current !== slug).slice(0, 2);
  } catch {}

  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(1920).height(1080).url()
    : null;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50">
        {/* Cover */}
        <div className="relative h-[55vh] lg:h-[65vh] overflow-hidden bg-stone-900">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              priority
              className="object-cover opacity-70"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-12 max-w-3xl mx-auto w-full">
            <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase">
              {post.category}
            </span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 lg:px-0 py-16">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs text-stone-500 tracking-[0.2em] uppercase hover:text-stone-900 transition-colors mb-12"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500 mb-8">
            <span className="flex items-center gap-2">
              <User size={13} /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={13} /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={13} /> {readTime(post.body as unknown[])}
            </span>
          </div>

          <h1 className="font-serif text-4xl lg:text-5xl font-light text-stone-900 leading-tight mb-8">
            {post.title}
          </h1>

          <p className="font-serif text-xl text-stone-500 italic leading-relaxed mb-12 border-l-2 border-stone-300 pl-6">
            {post.excerpt}
          </p>

          {/* Sanity Portable Text body */}
          <PortableText value={post.body as any} components={ptComponents} />
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-stone-200 py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-serif text-3xl font-light text-stone-900 mb-12">
                Outros Artigos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {related.map((rp) => (
                  <article key={rp._id}>
                    <Link href={`/blog/${rp.slug.current}`} className="group block">
                      <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 mb-5">
                        {rp.coverImage && (
                          <Image
                            src={urlFor(rp.coverImage).width(800).url()}
                            alt={rp.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 tracking-[0.25em] uppercase">
                        {rp.category}
                      </span>
                      <h3 className="font-serif text-xl font-light text-stone-900 mt-2 group-hover:text-stone-600 transition-colors leading-snug">
                        {rp.title}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
