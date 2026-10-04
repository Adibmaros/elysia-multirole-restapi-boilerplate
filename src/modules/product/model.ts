import { t } from "elysia";

export const CreateProductDto = t.Object({
  name: t.String({ minLength: 2 }),
  description: t.Optional(t.String()),
  price: t.Number({ minimum: 0 }),
  stock: t.Optional(t.Number({ minimum: 0 })),
});

export const UpdateProductDto = t.Object({
  name: t.Optional(t.String({ minLength: 2 })),
  description: t.Optional(t.String()),
  price: t.Optional(t.Number({ minimum: 0 })),
  stock: t.Optional(t.Number({ minimum: 0 })),
});
