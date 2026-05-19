import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, urlFor, formatDate, readTime, type SanityPost } from "@/lib/sanity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const revalidate = 60; // ISR: revalida a cada 60s

export const metadata: Metadata = {
  title: "Blog | Plano Arq",
  description: "Reflexões sobre arquitetura, design e o processo criativo do Plano Arq.",
};

export default async function BlogPage() {
  let posts: SanityPost[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Sanity não configurado ainda — página carrega vazia
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-stone-50">
        {/* Header */}
        <section className="pt-40 pb-16 px-6 lg:px-8 border-b border-stone-200">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-xs text-stone-500 tracking-[0.2em] uppercase hover:text-stone-900 transition-colors mb-10"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              Início
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-stone-400" />
              <span className="text-xs tracking-[0.3em] uppercase text-stone-500">Conteúdo</span>
            </div>
            <h1 className="font-serif text-7xl lg:text-9xl font-light text-stone-900">Blog</h1>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-32">
                <p className="font-serif text-2xl text-stone-400 font-light">
                  Nenhum post publicado ainda.
                </p>
                <p className="text-sm text-stone-400 mt-3">
                  Acesse{" "}
                  <Link href="/studio" className="underline hover:text-stone-700 transition-colors">
                    /studio
                  </Link>{" "}
                  para criar o primeiro post.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {posts.map((post) => (
                  <article key={post._id}>
                    <Link href={`/blog/${post.slug.current}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 mb-6">
                        {post.coverImage && (
                          <Image
                            src={urlFor(post.coverImage).width(800).height(500).url()}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-stone-500 tracking-[0.25em] uppercase">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {readTime(post.body as unknown[])}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl font-light text-stone-900 leading-snug group-hover:text-stone-600 transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="text-stone-300">·</span>
                        <span>{post.author}</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
