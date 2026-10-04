import { db } from "../../db";
import { products } from "../../db/schema";
import { eq } from "drizzle-orm";

export class ProductService {
  async getAll() {
    return await db.select().from(products);
  }

  async getById(id: number) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    if (!product) throw new Error("Product not found");
    return product;
  }

  async create(data: typeof products.$inferInsert) {
    const [result] = await db.insert(products).values(data);
    return { message: "Product created successfully", id: result.insertId };
  }

  async update(id: number, data: Partial<typeof products.$inferInsert>) {
    const [result] = await db.update(products).set(data).where(eq(products.id, id));
    if (result.affectedRows === 0) throw new Error("Product not found");
    return { message: "Product updated successfully" };
  }

  async delete(id: number) {
    const [result] = await db.delete(products).where(eq(products.id, id));
    if (result.affectedRows === 0) throw new Error("Product not found");
    return { message: "Product deleted successfully" };
  }
}
