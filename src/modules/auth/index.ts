import { Elysia } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { LoginDto, RegisterDto } from "./model";
import { AuthService } from "./service";

const authService = new AuthService();

export const authModule = new Elysia()
  .use(authPlugin)
  .post(
    "/register",
    async ({ body, set }) => {
      try {
        const result = await authService.register(body);
        return result;
      } catch (err: any) {
        set.status = 400;
        return { message: err.message };
      }
    },
    {
      body: RegisterDto,
      detail: { tags: ["Auth"] },
    }
  )
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      try {
        const user = await authService.login(body);
        const token = await jwt.sign({ id: user.id, role: user.role });
        return { token, user: { id: user.id, name: user.name, role: user.role } };
      } catch (err: any) {
        set.status = 401;
        return { message: err.message };
      }
    },
    {
      body: LoginDto,
      detail: { tags: ["Auth"] },
    }
  );
