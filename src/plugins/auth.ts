import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";

export const authPlugin = new Elysia({ name: "plugin.auth" })
  .use(bearer())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "fallback_secret",
    })
  )
  .derive({ as: "scoped" }, async ({ jwt, bearer }) => {
    if (!bearer) return { user: null };
    const payload = await jwt.verify(bearer);
    if (!payload) return { user: null };
    return { user: payload as { id: number; role: "admin" | "user" } };
  })
  .macro(({ onBeforeHandle }) => ({
    isAuthenticated(enabled: boolean) {
      if (!enabled) return;
      onBeforeHandle(({ user, set }: any) => {
        if (!user) {
          set.status = 401;
          return { message: "Unauthorized" };
        }
      });
    },
    isAdmin(enabled: boolean) {
      if (!enabled) return;
      onBeforeHandle(({ user, set }: any) => {
        if (!user) {
          set.status = 401;
          return { message: "Unauthorized" };
        }
        if (user.role !== "admin") {
          set.status = 403;
          return { message: "Forbidden: Admin access required" };
        }
      });
    },
  }));
