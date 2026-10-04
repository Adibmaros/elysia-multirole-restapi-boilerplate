import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { authModule } from "./modules/auth";
import { adminModule } from "./modules/admin";
import { userModule } from "./modules/user";
import { productModule } from "./modules/product";

const app = new Elysia()
  // Global Middleware & Plugins
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia Store API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  )

  // Simple Logger
  .onRequest(({ request }) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  })

  // Global Error Handler
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return { status: 400, message: "Validation Failed", detail: error.all };
    }
    if (code === "NOT_FOUND") {
      set.status = 404;
      return { status: 404, message: "Not Found" };
    }
    
    // Log unexpected errors
    console.error(`[ERROR]`, error);
    
    set.status = 500;
    return { status: 500, message: "Internal Server Error", detail: error.message };
  })

  // Modules Routing
  .group("/auth", (app) => app.use(authModule))
  .group("/admin", (app) => app.use(adminModule))
  .group("/user", (app) => app.use(userModule))
  .group("/product", (app) => app.use(productModule))

  .listen(3000);

console.log(
  `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📚 Swagger UI is available at http://${app.server?.hostname}:${app.server?.port}/swagger`
);
