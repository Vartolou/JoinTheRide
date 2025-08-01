import { 
  type User, 
  type InsertUser, 
  type QuranProgress, 
  type InsertQuranProgress,
  type HadithProgress,
  type InsertHadithProgress,
  type Friendship,
  type InsertFriendship,
  type Message,
  type InsertMessage,
  type UserActivity,
  type InsertUserActivity
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quran progress methods
  getQuranProgressByUser(userId: string): Promise<QuranProgress[]>;
  createQuranProgress(progress: InsertQuranProgress): Promise<QuranProgress>;
  
  // Hadith progress methods
  getHadithProgressByUser(userId: string): Promise<HadithProgress[]>;
  createHadithProgress(progress: InsertHadithProgress): Promise<HadithProgress>;
  updateHadithProgress(id: string, updates: Partial<HadithProgress>): Promise<HadithProgress>;
  
  // Friendship methods
  createFriendship(friendship: InsertFriendship): Promise<Friendship>;
  getFriendsByUser(userId: string): Promise<User[]>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByUser(userId: string): Promise<Message[]>;
  
  // User activity methods
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  getUserActivity(userId: string): Promise<UserActivity[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quranProgress: Map<string, QuranProgress>;
  private hadithProgress: Map<string, HadithProgress>;
  private friendships: Map<string, Friendship>;
  private messages: Map<string, Message>;
  private userActivity: Map<string, UserActivity>;

  constructor() {
    this.users = new Map();
    this.quranProgress = new Map();
    this.hadithProgress = new Map();
    this.friendships = new Map();
    this.messages = new Map();
    this.userActivity = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getQuranProgressByUser(userId: string): Promise<QuranProgress[]> {
    return Array.from(this.quranProgress.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async createQuranProgress(insertProgress: InsertQuranProgress): Promise<QuranProgress> {
    const id = randomUUID();
    const progress: QuranProgress = {
      ...insertProgress,
      id,
      completedAt: new Date()
    };
    this.quranProgress.set(id, progress);
    return progress;
  }

  async getHadithProgressByUser(userId: string): Promise<HadithProgress[]> {
    return Array.from(this.hadithProgress.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async createHadithProgress(insertProgress: InsertHadithProgress): Promise<HadithProgress> {
    const id = randomUUID();
    const progress: HadithProgress = {
      ...insertProgress,
      id,
      createdAt: new Date(),
      readAt: insertProgress.markedAsRead ? new Date() : null
    };
    this.hadithProgress.set(id, progress);
    return progress;
  }

  async updateHadithProgress(id: string, updates: Partial<HadithProgress>): Promise<HadithProgress> {
    const progress = this.hadithProgress.get(id);
    if (!progress) {
      throw new Error("Hadith progress not found");
    }
    
    const updatedProgress = {
      ...progress,
      ...updates,
      readAt: updates.markedAsRead ? new Date() : progress.readAt
    };
    
    this.hadithProgress.set(id, updatedProgress);
    return updatedProgress;
  }

  async createFriendship(insertFriendship: InsertFriendship): Promise<Friendship> {
    const id = randomUUID();
    const friendship: Friendship = {
      ...insertFriendship,
      id,
      createdAt: new Date()
    };
    this.friendships.set(id, friendship);
    return friendship;
  }

  async getFriendsByUser(userId: string): Promise<User[]> {
    const friendships = Array.from(this.friendships.values()).filter(
      (friendship) => friendship.followerId === userId,
    );
    
    const friendIds = friendships.map(f => f.followingId);
    return Array.from(this.users.values()).filter(user => friendIds.includes(user.id));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      readAt: null
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesByUser(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (message) => message.senderId === userId || message.receiverId === userId,
    );
  }

  async createUserActivity(insertActivity: InsertUserActivity): Promise<UserActivity> {
    const id = randomUUID();
    const activity: UserActivity = {
      ...insertActivity,
      id,
      date: insertActivity.date || new Date()
    };
    this.userActivity.set(id, activity);
    return activity;
  }

  async getUserActivity(userId: string): Promise<UserActivity[]> {
    return Array.from(this.userActivity.values()).filter(
      (activity) => activity.userId === userId,
    );
  }
}

export const storage = new MemStorage();
