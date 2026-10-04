import { db } from "./index";
import { users, products } from "./schema";

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // 1. Create Admin User
    const adminData = {
      name: "Super Admin",
      email: "admin@store.com",
      password: "password123", // In production, this should be hashed
      role: "admin" as const,
    };

    console.log("Creating admin user...");
    await db.insert(users).values(adminData).onDuplicateKeyUpdate({ set: { id: 1 } }); // Safe for MySQL to avoid crashes if it exists
    console.log("✅ Admin user created/verified.");

    // 2. Create Sample Products
    const sampleProducts = [
      { name: "Laptop Pro X", description: "High-end laptop", price: 1500, stock: 10 },
      { name: "Wireless Mouse", description: "Ergonomic mouse", price: 50, stock: 100 },
      { name: "Mechanical Keyboard", description: "Clicky switches", price: 120, stock: 30 },
    ];

    console.log("Creating sample products...");
    for (const p of sampleProducts) {
      await db.insert(products).values(p);
    }
    console.log("✅ Sample products created.");

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    process.exit(0);
  }
}

seed();
