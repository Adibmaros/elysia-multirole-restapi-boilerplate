import { Elysia, t } from "elysia";
import { authPlugin } from "../../plugins/auth";
import { CreateProductDto, UpdateProductDto } from "./model";
import { ProductService } from "./service";

const productService = new ProductService();

export const productModule = new Elysia()
  .use(authPlugin)
  // Public Routes
  .get(
    "/",
    async () => {
      return await productService.getAll();
    },
    { detail: { tags: ["Product"] } }
  )
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      try {
        return await productService.getById(id);
      } catch (err: any) {
        set.status = 404;
        return { message: err.message };
      }
    },
    {
      params: t.Object({ id: t.Numeric() }),
      detail: { tags: ["Product"] },
    }
  )

  // Protected Routes (Require Admin role)
  .guard({ isAdmin: true }, (app) =>
    app
      .post(
        "/",
        async ({ body, set }) => {
          try {
            return await productService.create(body);
          } catch (err: any) {
            set.status = 400;
            return { message: err.message };
          }
        },
        {
          body: CreateProductDto,
          detail: { tags: ["Product (Admin)"] },
        }
      )
      .put(
        "/:id",
        async ({ params: { id }, body, set }) => {
          try {
            return await productService.update(id, body);
          } catch (err: any) {
            set.status = 400;
            return { message: err.message };
          }
        },
        {
          params: t.Object({ id: t.Numeric() }),
          body: UpdateProductDto,
          detail: { tags: ["Product (Admin)"] },
        }
      )
      .delete(
        "/:id",
        async ({ params: { id }, set }) => {
          try {
            return await productService.delete(id);
          } catch (err: any) {
            set.status = 404;
            return { message: err.message };
          }
        },
        {
          params: t.Object({ id: t.Numeric() }),
          detail: { tags: ["Product (Admin)"] },
        }
      )
  );
