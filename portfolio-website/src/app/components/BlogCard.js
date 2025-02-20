'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        className="funky-border rounded-xl p-1"
        whileHover={{ scale: 1.02, rotate: 1 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="bg-foreground/5 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="mt-3 text-xl font-semibold gradient-text">
            {post.title}
          </h3>
          
          <p className="mt-2 text-foreground/70 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="rounded-full px-3 py-1 text-sm"
                style={{
                  background: `var(--accent${(index % 4) + 1})`,
                  color: 'white'
                }}
                whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 