import { Link } from "wouter";
import { Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">DailyGodsLove</h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Sharing the enduring truth of the Gospel and encouraging believers in their daily walk.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary-foreground/70 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/devotionals" className="text-primary-foreground/70 hover:text-white transition-colors">Devotionals</Link></li>
              <li><Link href="/about" className="text-primary-foreground/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <a 
              href="https://twitter.com/DailyGodsLove" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-white transition-colors"
            >
              <Twitter size={20} />
              <span>@DailyGodsLove</span>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} DailyGodsLove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
