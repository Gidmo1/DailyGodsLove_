import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="bg-secondary/50 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing the light of the Gospel in a digital age.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-3xl mx-auto py-16 flex-grow">
        <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-primary mx-auto">
          <p className="lead text-xl text-primary/80 italic font-serif">
            "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen." — 2 Peter 3:18
          </p>
          
          <h3>Our Mission</h3>
          <p>
            DailyGodsLove was created with a simple purpose: to share the transformative power of the Gospel through accessible, daily reflections. In a world that is often noisy and chaotic, we seek to provide a quiet digital sanctuary where believers can refocus their hearts on Christ.
          </p>
          
          <h3>What We Believe</h3>
          <p>
            We hold to the historic Christian faith, believing in the authority of Scripture and the centrality of Jesus Christ. Our devotionals are crafted not just to inform, but to encourage spiritual formation and a deeper walk with God.
          </p>
          
          <h3>Join Our Journey</h3>
          <p>
            Whether you are a lifelong believer or just beginning to explore questions of faith, you are welcome here. We invite you to read, reflect, and share these messages of hope.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
