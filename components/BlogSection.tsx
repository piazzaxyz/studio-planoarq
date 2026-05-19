"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverUrl: string | null;
  slug: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/blog-preview")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="py-32 lg:py-40 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-stone-400" />
              <span className="text-xs tracking-[0.3em] uppercase text-stone-500">Conteúdo</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-light text-stone-900">
              Reflexões & Ideias
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
            >
              <span>Ver todos</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        {posts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-stone-200 mb-5" />
                <div className="h-3 bg-stone-200 rounded w-1/3 mb-3" />
                <div className="h-5 bg-stone-200 rounded mb-2" />
                <div className="h-4 bg-stone-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 mb-5">
                    {post.coverUrl && (
                      <Image
                        src={post.coverUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/15 transition-colors duration-500" />
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-stone-500 tracking-[0.25em] uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-stone-400">{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-light text-stone-900 leading-snug group-hover:text-stone-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <span className="w-5 h-px bg-stone-300 group-hover:w-8 group-hover:bg-stone-600 transition-all duration-300" />
                    <span className="text-xs text-stone-400">{post.date}</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
