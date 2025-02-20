import { posts } from '../../data/posts';

export default function BlogPost({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto prose prose-blue dark:prose-invert">
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
        
        <h1 className="mt-8 text-4xl font-bold">{post.title}</h1>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-foreground/5 px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Add your blog post content here */}
        <div className="mt-8">
          {/* This is where you'd put your actual blog post content */}
          <p className="text-lg text-foreground/80">
            {post.excerpt}
          </p>
        </div>
      </article>
    </main>
  );
} 