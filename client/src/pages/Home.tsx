import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePosts } from "@/hooks/use-posts";
import { DevotionalCard } from "@/components/DevotionalCard";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Heart, MessageCircle, Quote, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { toPng } from "html-to-image";
import download from "downloadjs";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: dailyVerse, isLoading: isLoadingVerse } = useQuery({
    queryKey: [api.dailyVerse.get.path],
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", api.newsletter.subscribe.path, { email });
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  const downloadVerseCard = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      download(dataUrl, `DailyGodsLove-Verse-${new Date().toISOString().split('T')[0]}.png`);
    } catch (err) {
      console.error("Error generating image", err);
      toast({ title: "Error", description: "Failed to generate image", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const shareVerseAsText = () => {
    if (!dailyVerse) return;
    const text = `Verse of the Day\n\n"${dailyVerse.text}"\n— ${dailyVerse.book} ${dailyVerse.chapter}:${dailyVerse.verse}\n\nToday's Teaching: ${dailyVerse.teaching}\n\nDailyGodsLove - Sharing the Gospel daily`;
    if (navigator.share) {
      navigator.share({
        title: "Verse of the Day",
        text: text,
        url: window.location.origin
      }).catch(() => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied", description: "Verse text copied to clipboard" });
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Verse text copied to clipboard" });
    }
  };
  
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

      {/* Daily Verse Section */}
      <section className="py-24 bg-white border-y border-border/50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold tracking-widest uppercase text-xs mb-3 block">Daily Inspiration</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Verse of the Day</h2>
          </div>

          {isLoadingVerse ? (
            <div className="h-64 bg-secondary/20 animate-pulse rounded-xl" />
          ) : dailyVerse ? (
            <div className="space-y-8">
              {/* Visual Share Card for Image Generation (Hidden) */}
              <div className="fixed -left-[2000px] top-0">
                <div 
                  ref={cardRef}
                  className="w-[1080px] h-[1080px] bg-white p-24 flex flex-col justify-between text-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)" }}
                >
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full -mr-32 -mt-32" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full -ml-32 -mb-32" />
                  
                  <div className="relative z-10 flex-grow flex flex-col justify-center">
                    <Quote className="w-24 h-24 text-primary/10 mx-auto mb-12" />
                    <p className="text-6xl font-serif italic text-primary mb-16 leading-relaxed px-12">
                      "{dailyVerse.text}"
                    </p>
                    <p className="text-4xl font-bold text-accent">
                      — {dailyVerse.book} {dailyVerse.chapter}:{dailyVerse.verse}
                    </p>
                  </div>

                  <div className="relative z-10 pb-16 border-t border-primary/10">
                    <div className="text-5xl font-serif font-bold text-primary tracking-tight">DailyGodsLove</div>
                    <div className="text-xl font-bold tracking-[0.4em] text-accent uppercase mt-6">Sharing the Gospel daily</div>
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-secondary/30 p-8 md:p-12 rounded-2xl relative overflow-hidden"
              >
                <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/5 -z-0" />
                <div className="relative z-10">
                  <p className="text-2xl md:text-3xl font-serif italic text-primary mb-6 leading-relaxed">
                    "{dailyVerse.text}"
                  </p>
                  <p className="text-lg font-bold text-accent mb-8">
                    — {dailyVerse.book} {dailyVerse.chapter}:{dailyVerse.verse}
                  </p>
                  <div className="pt-8 border-t border-primary/10">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary/60 mb-4">Today's Teaching</h4>
                    <p className="text-muted-foreground leading-relaxed italic">
                      {dailyVerse.teaching}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={downloadVerseCard}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : <><Download className="w-5 h-5" /> Download Image</>}
                </button>
                <button 
                  onClick={shareVerseAsText}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-border text-primary font-bold rounded-xl hover:bg-secondary/20 transition-all shadow-sm"
                >
                  <Share2 className="w-5 h-5" /> Share as Text
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container-custom max-w-4xl text-center">
          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-border/50">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Join Our Daily Walk</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Subscribe to receive the Gospel and our latest devotionals directly in your inbox. No spam, just grace.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <button 
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
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
