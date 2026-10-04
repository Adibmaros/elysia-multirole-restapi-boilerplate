import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export class AuthService {
  async register(data: typeof users.$inferInsert) {
    const existing = await db.select().from(users).where(eq(users.email, data.email));
    if (existing.length > 0) {
      throw new Error("Email already exists");
    }
    // In a real app, hash the password here (e.g. bun:password)
    const [result] = await db.insert(users).values(data);
    return { message: "User registered successfully", id: result.insertId };
  }

  async login(data: Pick<typeof users.$inferInsert, "email" | "password">) {
    const [user] = await db.select().from(users).where(eq(users.email, data.email));
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // In a real app, compare hashed password here
    if (user.password !== data.password) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
}
