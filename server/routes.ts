import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuranProgressSchema, insertHadithProgressSchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Quran progress routes
  app.post("/api/quran-progress", async (req, res) => {
    try {
      const progressData = insertQuranProgressSchema.parse(req.body);
      const progress = await storage.createQuranProgress(progressData);
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quran-progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getQuranProgressByUser(req.params.userId);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Hadith progress routes
  app.post("/api/hadith-progress", async (req, res) => {
    try {
      const progressData = insertHadithProgressSchema.parse(req.body);
      const progress = await storage.createHadithProgress(progressData);
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/hadith-progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getHadithProgressByUser(req.params.userId);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/hadith-progress/:id", async (req, res) => {
    try {
      const { markedAsRead } = req.body;
      const progress = await storage.updateHadithProgress(req.params.id, { markedAsRead });
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Friends routes
  app.post("/api/friendships", async (req, res) => {
    try {
      const { followerId, followingId } = req.body;
      const friendship = await storage.createFriendship({ followerId, followingId });
      res.json(friendship);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/friends/:userId", async (req, res) => {
    try {
      const friends = await storage.getFriendsByUser(req.params.userId);
      res.json(friends);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Messages routes
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/messages/:userId", async (req, res) => {
    try {
      const messages = await storage.getMessagesByUser(req.params.userId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // User activity routes
  app.get("/api/activity/:userId", async (req, res) => {
    try {
      const activity = await storage.getUserActivity(req.params.userId);
      res.json(activity);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
