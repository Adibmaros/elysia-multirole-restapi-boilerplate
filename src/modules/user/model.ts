import { t } from "elysia";

export const UpdateProfileDto = t.Object({
  name: t.Optional(t.String({ minLength: 2 })),
  password: t.Optional(t.String({ minLength: 6 })),
});
