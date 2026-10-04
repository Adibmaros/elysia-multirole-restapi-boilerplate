import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export class AdminService {
  async getAllUsers() {
    return await db.select().from(users);
  }

  async deleteUser(id: number) {
    const [result] = await db.delete(users).where(eq(users.id, id));
    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}
