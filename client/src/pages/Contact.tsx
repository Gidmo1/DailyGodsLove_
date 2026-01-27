import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree handles the submission, we just need to manage the loading state
  // and ensure the form posts correctly.
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mvzalwwn", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We will get back to you soon.",
          variant: "default",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="bg-secondary/50 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We would love to hear from you. Send us a message, prayer request, or feedback.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-4xl mx-auto py-16 flex-grow">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you have questions about our content, want to share a testimony, or simply need someone to pray with you, please don't hesitate to reach out.
            </p>
            
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-secondary p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary">Email Support</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill out the form and we will respond via email as soon as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-lg border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="How can we help you today?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}
