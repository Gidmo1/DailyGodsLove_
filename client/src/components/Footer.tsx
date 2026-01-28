import { Link } from "wouter";
import { Twitter, Mail, Heart } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

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

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">DailyGodsLove</h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Sharing the enduring truth of the Gospel and encouraging believers in their daily walk.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://twitter.com/DailyGodsLove" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
              <Link 
                href="/contact"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Mail size={20} />
              </Link>
            </div>
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
            <h4 className="font-bold mb-4 text-white">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">Daily grace in your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email" 
                required
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white placeholder:text-primary-foreground/50"
              />
              <button 
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full py-2 bg-white text-primary font-bold rounded-md hover:bg-primary-foreground transition-colors disabled:opacity-50"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} DailyGodsLove. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center">
          </p>
        </div>
      </div>
    </footer>
  );
}
