import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.newsletter.subscribe.path, async (req, res) => {
    try {
      const input = api.newsletter.subscribe.input.parse(req.body);
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(200).json({ message: "Already subscribed" });
      }
      await storage.createSubscriber(input);
      res.status(200).json({ message: "Thank you for subscribing" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.dailyVerse.get.path, async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const verse = await storage.getDailyVerse(today);
    if (!verse) {
      return res.status(404).json({ message: "Daily verse not found" });
    }
    res.json(verse);
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
      title: "Walking in Faith",
      slug: "walking-in-faith",
      excerpt: "Understanding what it means to trust God in our daily lives.",
      content: "Faith is the substance of things hoped for, the evidence of things not seen. In our daily walk, we encounter various trials and tribulations that test our resolve. To walk in faith means to trust in God's plan even when the path ahead is not clear. It requires patience, prayer, and a steadfast heart. By surrounding ourselves with scripture and a community of believers, we can strengthen our faith and find peace in the midst of the storm.",
      isPublished: true
    });
    
    await storage.createPost({
      title: "The Power of Prayer",
      slug: "power-of-prayer",
      excerpt: "How daily communication with God transforms our perspective.",
      content: "Prayer is more than just asking for things; it is a conversation with our Creator. When we dedicate time each day to pray, we align our hearts with God's will. It brings clarity, comfort, and strength. Whether we are in a season of joy or a season of sorrow, prayer remains our direct line to the divine. It changes not just our circumstances, but us.",
      isPublished: true
    });

    await storage.createPost({
      title: "Love Thy Neighbor",
      slug: "love-thy-neighbor",
      excerpt: "Applying the greatest commandment in a modern world.",
      content: "In a world that often feels divided, the commandment to love our neighbor is more relevant than ever. This love is actionable. It looks like kindness to a stranger, patience with a difficult coworker, and generosity to those in need. By embodying Christ's love in our interactions, we become beacons of light in our communities.",
      isPublished: true
    });
  }

  const today = new Date().toISOString().split('T')[0];
  const existingVerse = await storage.getDailyVerse(today);
  if (!existingVerse) {
    await storage.createBibleVerse({
      book: "John",
      chapter: "3",
      verse: "16",
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      teaching: "This verse is the core of the Gospel. It reminds us of the immense love God has for humanity and the simple path to salvation through faith in Jesus Christ.",
      dayOfYear: today
    });
  }
}
