'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-foreground/5 rounded-lg p-6 hover:bg-foreground/10 transition-colors"
    >
      <Link href={`/blog/${post.slug}`}>
        <h3 className="font-bold text-xl mb-2">{post.title}</h3>
        <p className="text-foreground/60 mb-4">{post.description}</p>
        <div className="flex justify-between items-center text-sm text-foreground/60">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent1/10 text-accent1"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-center mb-12">
            <span className="gradient-text">Latest Posts</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 