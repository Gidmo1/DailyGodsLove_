import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePost } from "@/hooks/use-posts";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Twitter, Share2, Facebook, MessageCircle, Download } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { useToast } from "@/hooks/use-toast";

export default function PostDetail() {
  const [, params] = useRoute("/devotional/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, isError } = usePost(slug);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const shareUrl = window.location.href;
  const shareText = post ? `${post.title} - DailyGodsLove` : "";

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      download(dataUrl, `DailyGodsLove-${slug}.png`);
    } catch (err) {
      console.error("Error generating image", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container-custom py-24 flex-grow">
          <div className="max-w-3xl mx-auto">
            <div className="h-8 w-24 bg-gray-200 rounded mb-8 animate-pulse" />
            <div className="h-16 w-3/4 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-12 animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="container-custom py-24 flex-grow text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The devotional you are looking for does not exist or has been removed.</p>
          <Link href="/devotionals" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Devotionals
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <article className="flex-grow">
        <div className="bg-secondary/30 py-16 md:py-24">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <span className="inline-block py-1 px-3 rounded-full bg-white border border-border text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container-custom max-w-3xl mx-auto py-16">
          <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-primary prose-a:text-accent prose-img:rounded-lg mx-auto">
            {post.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
            ))}
          </div>

          {/* Visual Share Card for Image Generation */}
          <div className="fixed -left-[2000px] top-0">
            <div 
              ref={cardRef}
              className="w-[1080px] h-[1080px] bg-white p-24 flex flex-col justify-between text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)" }}
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full -ml-32 -mb-32" />
              
              <div className="relative z-10 flex-grow flex flex-col justify-center">
                <div className="w-32 h-2 bg-accent mx-auto mb-16 rounded-full" />
                <h2 className="text-7xl font-serif font-bold text-primary mb-16 leading-tight uppercase tracking-tight px-12">
                  {post.title}
                </h2>
                <div className="text-4xl font-serif italic text-muted-foreground leading-relaxed px-20">
                  "{post.excerpt}"
                </div>
              </div>

              <div className="relative z-10 pb-16 border-t border-primary/10">
                <div className="text-5xl font-serif font-bold text-primary tracking-tight">DailyGodsLove</div>
                <div className="text-xl font-bold tracking-[0.4em] text-accent uppercase mt-6">Sharing the Gospel daily</div>
              </div>
            </div>
          </div>

          {/* Social Share Card UI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white border border-border rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="p-8 text-center border-b border-border bg-secondary/10">
              <Share2 className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Share the Gospel</h3>
              <p className="text-muted-foreground text-sm">Pass on this encouragement to your friends and family.</p>
            </div>
            
            <div className="p-8 bg-secondary/5 border-b border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={downloadCard}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md"
              >
                {isGenerating ? "Generating..." : <><Download className="w-5 h-5" /> Download Image</>}
              </button>
              
              <button 
                onClick={() => {
                   const text = `${shareText}\n\n"${post.excerpt}"\n\nRead more at: ${shareUrl}`;
                   if (navigator.share) {
                     navigator.share({
                       title: shareText,
                       text: text,
                       url: shareUrl
                     }).catch(() => {
                        // Fallback to clipboard
                        navigator.clipboard.writeText(text);
                        toast({ title: "Copied", description: "Share text copied to clipboard" });
                     });
                   } else {
                     navigator.clipboard.writeText(text);
                     toast({ title: "Copied", description: "Share text copied to clipboard" });
                   }
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white border border-border text-primary font-bold hover:bg-secondary/20 transition-all shadow-sm"
              >
                <Share2 className="w-5 h-5" /> Share as Text
              </button>
            </div>

            <div className="p-6 flex justify-center gap-4 flex-wrap border-b border-border">
              <button 
                onClick={shareOnTwitter}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DA1F2] text-white font-bold hover:brightness-110 transition-all text-sm"
              >
                <Twitter className="w-4 h-4" /> Twitter
              </button>
              <button 
                onClick={shareOnFacebook}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4267B2] text-white font-bold hover:brightness-110 transition-all text-sm"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:brightness-110 transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </button>
            </div>
            <div className="p-4 bg-primary text-primary-foreground text-center text-xs font-bold tracking-widest uppercase">
              DailyGodsLove - Sharing the Gospel daily
            </div>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
             <Link href="/devotionals" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-medium">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to All Devotionals
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
