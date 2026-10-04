import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export class UserService {
  async getProfile(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) throw new Error("User not found");
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async updateProfile(id: number, data: Partial<typeof users.$inferInsert>) {
    const [result] = await db.update(users).set(data).where(eq(users.id, id));
    if (result.affectedRows === 0) throw new Error("User not found");
    return { message: "Profile updated successfully" };
  }
}
