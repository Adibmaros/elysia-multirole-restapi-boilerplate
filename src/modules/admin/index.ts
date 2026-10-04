import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { AdminService } from "./service";

const adminService = new AdminService();

export const adminModule = new Elysia()
  .use(authPlugin)
  .guard({ isAdmin: true }, (app) =>
    app
      .get(
        "/dashboard",
        ({ user }) => {
          return { message: `Welcome to admin dashboard, user ID: ${user?.id}` };
        },
        { detail: { tags: ["Admin"] } }
      )
      .get(
        "/users",
        async () => {
          return await adminService.getAllUsers();
        },
        { detail: { tags: ["Admin"] } }
      )
      .delete(
        "/users/:id",
        async ({ params: { id }, set }) => {
          try {
            return await adminService.deleteUser(id);
          } catch (err: any) {
            set.status = 404;
            return { message: err.message };
          }
        },
        {
          params: t.Object({ id: t.Numeric() }),
          detail: { tags: ["Admin"] },
        }
      )
  );
