import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/use-posts";
import { DevotionalCard } from "@/components/DevotionalCard";

export default function Devotionals() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="bg-secondary/50 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Devotionals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of thoughts, prayers, and biblical studies to deepen your understanding and faith.
          </p>
        </div>
      </div>

      <div className="container-custom py-16 flex-grow">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <DevotionalCard key={post.id} post={post} />
            ))}
            
            {(!posts || posts.length === 0) && (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-muted-foreground">No devotionals found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
