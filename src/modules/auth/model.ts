import { t } from "elysia";

export const LoginDto = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});

export const RegisterDto = t.Object({
  name: t.String({ minLength: 2 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6 }),
});
