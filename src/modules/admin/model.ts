import { t } from "elysia";

// We can define response models if needed, but for now they are fairly standard.
// Example:
export const UserResponseDto = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String(),
  role: t.String(),
  createdAt: t.Date(),
});
