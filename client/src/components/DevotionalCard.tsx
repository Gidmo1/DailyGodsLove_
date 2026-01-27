import { Link } from "wouter";
import { Post } from "@shared/schema";
import { format } from "date-fns";

interface DevotionalCardProps {
  post: Post;
}

export function DevotionalCard({ post }: DevotionalCardProps) {
  return (
    <div className="group bg-card rounded-lg border border-border/50 overflow-hidden hover-lift flex flex-col h-full">
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4 text-xs font-semibold tracking-wider text-accent uppercase">
          {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
        </div>
        
        <h3 className="text-2xl font-serif font-bold mb-3 text-primary group-hover:text-accent transition-colors">
          <Link href={`/devotional/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="pt-6 mt-auto border-t border-border/50">
          <Link 
            href={`/devotional/${post.slug}`}
            className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors"
          >
            Read Devotional &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
