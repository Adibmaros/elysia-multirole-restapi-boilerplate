import { Elysia } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { UpdateProfileDto } from "./model";
import { UserService } from "./service";

const userService = new UserService();

export const userModule = new Elysia()
  .use(authPlugin)
  .guard({ isAuthenticated: true }, (app) =>
    app
      .get(
        "/profile",
        async ({ user, set }) => {
          try {
            if (!user) {
              set.status = 401;
              return { message: "Unauthorized" };
            }
            return await userService.getProfile(user.id);
          } catch (err: any) {
            set.status = 404;
            return { message: err.message };
          }
        },
        { detail: { tags: ["User"] } }
      )
      .put(
        "/profile",
        async ({ user, body, set }) => {
          try {
            if (!user) {
              set.status = 401;
              return { message: "Unauthorized" };
            }
            return await userService.updateProfile(user.id, body);
          } catch (err: any) {
            set.status = 400;
            return { message: err.message };
          }
        },
        {
          body: UpdateProfileDto,
          detail: { tags: ["User"] },
        }
      )
  );
