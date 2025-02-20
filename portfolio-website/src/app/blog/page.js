import { posts } from '../data/posts';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
  return (
    <main className="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Blog Posts</h1>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
} 