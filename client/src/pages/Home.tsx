import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/use-posts";
import { DevotionalCard } from "@/components/DevotionalCard";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  
  // Display only the latest 3 posts
  const recentPosts = posts?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide mb-6">
              Welcome to DailyGodsLove
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6 leading-tight">
              Walking Daily within <br/> His Grace and Truth
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover encouragement, biblical wisdom, and reflections on the Christian faith to guide your daily journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/devotionals" className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300">
                Read Devotionals
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white border border-border text-foreground font-semibold shadow-sm hover:bg-gray-50 transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission/Values Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Biblical Truth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rooted deeply in Scripture, offering insights that are faithful to the text and applicable to modern life.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Encouragement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Words of hope and comfort for the weary soul, reminding you of God's steadfast love.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connecting believers through shared faith and open dialogue about the Christian walk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Devotionals Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Latest Devotionals</h2>
              <p className="text-muted-foreground max-w-xl">Fresh insights and reflections published recently.</p>
            </div>
            <Link href="/devotionals" className="hidden md:inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-4 md:mt-0">
              View All Posts <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts?.map((post) => (
                <DevotionalCard key={post.id} post={post} />
              ))}
              {(!recentPosts || recentPosts.length === 0) && (
                <div className="col-span-3 text-center py-12 text-muted-foreground bg-white rounded-lg border border-dashed border-border">
                  <p>No devotionals published yet. Check back soon.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/devotionals" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All Posts <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter/Quote Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            "For I am convinced that neither death nor life... will be able to separate us from the love of God."
          </h2>
          <p className="text-lg opacity-80 mb-0 font-serif italic">— Romans 8:38-39</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
