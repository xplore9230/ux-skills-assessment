import { type User, type InsertUser, type DeviceAccess, type InsertDeviceAccess } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Premium device access methods
  getDeviceAccess(deviceId: string): Promise<DeviceAccess | undefined>;
  createDeviceAccess(deviceAccess: InsertDeviceAccess): Promise<DeviceAccess>;
  updateDeviceAccess(deviceId: string, updates: Partial<DeviceAccess>): Promise<DeviceAccess | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private deviceAccessMap: Map<string, DeviceAccess>;

  constructor() {
    this.users = new Map();
    this.deviceAccessMap = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Premium device access methods
  async getDeviceAccess(deviceId: string): Promise<DeviceAccess | undefined> {
    return this.deviceAccessMap.get(deviceId);
  }

  async createDeviceAccess(insertDeviceAccess: InsertDeviceAccess): Promise<DeviceAccess> {
    const now = new Date().toISOString();
    const deviceAccess: DeviceAccess = {
      deviceId: insertDeviceAccess.deviceId,
      attemptCount: insertDeviceAccess.attemptCount ?? 0,
      premiumUnlocked: insertDeviceAccess.premiumUnlocked ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.deviceAccessMap.set(insertDeviceAccess.deviceId, deviceAccess);
    return deviceAccess;
  }

  async updateDeviceAccess(deviceId: string, updates: Partial<DeviceAccess>): Promise<DeviceAccess | undefined> {
    const existing = this.deviceAccessMap.get(deviceId);
    if (!existing) {
      return undefined;
    }
    const updated: DeviceAccess = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.deviceAccessMap.set(deviceId, updated);
    return updated;
  }
}

export const storage = new MemStorage();
