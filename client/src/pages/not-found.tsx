import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-grow flex items-center justify-center py-24 bg-secondary/20">
        <div className="container-custom max-w-md text-center">
          <div className="mb-6 flex justify-center text-accent">
            <AlertCircle size={64} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">404 Page Not Found</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            We couldn't find the page you were looking for. It may have been moved or deleted.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
