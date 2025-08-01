// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  quranProgress;
  hadithProgress;
  friendships;
  messages;
  userActivity;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.quranProgress = /* @__PURE__ */ new Map();
    this.hadithProgress = /* @__PURE__ */ new Map();
    this.friendships = /* @__PURE__ */ new Map();
    this.messages = /* @__PURE__ */ new Map();
    this.userActivity = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  async getQuranProgressByUser(userId) {
    return Array.from(this.quranProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }
  async createQuranProgress(insertProgress) {
    const id = randomUUID();
    const progress = {
      ...insertProgress,
      id,
      completedAt: /* @__PURE__ */ new Date()
    };
    this.quranProgress.set(id, progress);
    return progress;
  }
  async getHadithProgressByUser(userId) {
    return Array.from(this.hadithProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }
  async createHadithProgress(insertProgress) {
    const id = randomUUID();
    const progress = {
      ...insertProgress,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      readAt: insertProgress.markedAsRead ? /* @__PURE__ */ new Date() : null
    };
    this.hadithProgress.set(id, progress);
    return progress;
  }
  async updateHadithProgress(id, updates) {
    const progress = this.hadithProgress.get(id);
    if (!progress) {
      throw new Error("Hadith progress not found");
    }
    const updatedProgress = {
      ...progress,
      ...updates,
      readAt: updates.markedAsRead ? /* @__PURE__ */ new Date() : progress.readAt
    };
    this.hadithProgress.set(id, updatedProgress);
    return updatedProgress;
  }
  async createFriendship(insertFriendship) {
    const id = randomUUID();
    const friendship = {
      ...insertFriendship,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.friendships.set(id, friendship);
    return friendship;
  }
  async getFriendsByUser(userId) {
    const friendships2 = Array.from(this.friendships.values()).filter(
      (friendship) => friendship.followerId === userId
    );
    const friendIds = friendships2.map((f) => f.followingId);
    return Array.from(this.users.values()).filter((user) => friendIds.includes(user.id));
  }
  async createMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      readAt: null
    };
    this.messages.set(id, message);
    return message;
  }
  async getMessagesByUser(userId) {
    return Array.from(this.messages.values()).filter(
      (message) => message.senderId === userId || message.receiverId === userId
    );
  }
  async createUserActivity(insertActivity) {
    const id = randomUUID();
    const activity = {
      ...insertActivity,
      id,
      date: insertActivity.date || /* @__PURE__ */ new Date()
    };
    this.userActivity.set(id, activity);
    return activity;
  }
  async getUserActivity(userId) {
    return Array.from(this.userActivity.values()).filter(
      (activity) => activity.userId === userId
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  photoURL: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow()
});
var quranProgress = pgTable("quran_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  surah: integer("surah").notNull(),
  ayah: integer("ayah").notNull(),
  hizb: integer("hizb").notNull(),
  completedAt: timestamp("completed_at").defaultNow()
});
var hadithProgress = pgTable("hadith_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  hadithId: varchar("hadith_id").notNull(),
  hadithText: text("hadith_text").notNull(),
  source: text("source").notNull(),
  markedAsRead: boolean("marked_as_read").default(false),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var friendships = pgTable("friendships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  followerId: varchar("follower_id").notNull().references(() => users.id),
  followingId: varchar("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});
var messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  readAt: timestamp("read_at")
});
var userActivity = pgTable("user_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(),
  // 'quran_read', 'hadith_read'
  date: timestamp("date").defaultNow(),
  metadata: jsonb("metadata")
  // Additional activity data
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertQuranProgressSchema = createInsertSchema(quranProgress).omit({
  id: true,
  completedAt: true
});
var insertHadithProgressSchema = createInsertSchema(hadithProgress).omit({
  id: true,
  createdAt: true
});
var insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  createdAt: true
});
var insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true
});
var insertUserActivitySchema = createInsertSchema(userActivity).omit({
  id: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/quran-progress", async (req, res) => {
    try {
      const progressData = insertQuranProgressSchema.parse(req.body);
      const progress = await storage.createQuranProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/quran-progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getQuranProgressByUser(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/hadith-progress", async (req, res) => {
    try {
      const progressData = insertHadithProgressSchema.parse(req.body);
      const progress = await storage.createHadithProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/hadith-progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getHadithProgressByUser(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.patch("/api/hadith-progress/:id", async (req, res) => {
    try {
      const { markedAsRead } = req.body;
      const progress = await storage.updateHadithProgress(req.params.id, { markedAsRead });
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.post("/api/friendships", async (req, res) => {
    try {
      const { followerId, followingId } = req.body;
      const friendship = await storage.createFriendship({ followerId, followingId });
      res.json(friendship);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/friends/:userId", async (req, res) => {
    try {
      const friends = await storage.getFriendsByUser(req.params.userId);
      res.json(friends);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/messages/:userId", async (req, res) => {
    try {
      const messages2 = await storage.getMessagesByUser(req.params.userId);
      res.json(messages2);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/activity/:userId", async (req, res) => {
    try {
      const activity = await storage.getUserActivity(req.params.userId);
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
