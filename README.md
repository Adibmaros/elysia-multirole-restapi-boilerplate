# 🦊 ElysiaJS Modular REST API Starter

A feature-complete, production-ready REST API starter built with **[ElysiaJS](https://elysiajs.com/)**, **[Bun](https://bun.sh/)**, **[Drizzle ORM](https://orm.drizzle.team/)**, and **MySQL**. It features JWT Multi-Role Authentication, a clean **Service-Controller-Model** architecture per module, OpenAPI/Scalar Documentation, and global middleware.

---

## 🌟 Key Features

* **⚡ Ultra Fast**: Built on top of Bun & ElysiaJS for maximum performance.
* **🛡️ JWT Multi-Role Auth**: Secure authentication with Role-Based Access Control (`admin` and `user`).
* **🧩 Modular Architecture**: Strict separation of concerns for every feature (`model.ts`, `service.ts`, `index.ts`).
* **🗄️ Drizzle ORM**: Type-safe database interactions with MySQL.
* **📚 Interactive API Docs**: Built-in Scalar / Swagger documentation at `/swagger`.
* **🌐 CORS & Global Error Handling**: Ready out-of-the-box for frontend integration with centralized exception handling.
* **🌱 Data Seeding**: Easy setup script to populate initial Admin & Product data.

---

## 📂 Project Architecture

The project follows a clean modular pattern under `src/modules/`:

```text
src/
├── db/                     # Drizzle ORM setup & schemas
│   ├── index.ts            # Database client connection
│   ├── schema.ts           # Drizzle table definitions
│   └── seed.ts             # Seeding script for sample data
├── plugins/                # Custom Elysia plugins
│   └── auth.ts             # JWT & RBAC Macro plugin
├── modules/                # Feature Modules
│   ├── auth/               # Register & Login
│   │   ├── model.ts        # Validation DTOs (Elysia `t`)
│   │   ├── service.ts      # Authentication logic
│   │   └── index.ts        # Routes / Controllers
│   ├── admin/              # Admin-only operations
│   │   ├── model.ts
│   │   ├── service.ts
│   │   └── index.ts
│   ├── user/               # User Profile management
│   │   ├── model.ts
│   │   ├── service.ts
│   │   └── index.ts
│   └── product/            # Product CRUD operations
│       ├── model.ts
│       ├── service.ts
│       └── index.ts
├── drizzle.config.ts       # Drizzle Kit migration configuration
└── index.ts                # Main application entry point & route assembly
```

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have installed:
* [Bun](https://bun.sh/) (`>= 1.0`)
* MySQL Database running locally or remotely

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd belajar-elysia-3
bun install
```

### 3. Environment Variables Setup

Copy `.env.example` to `.env` and configure your database credentials and secret key:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL=mysql://root:@localhost:3306/belajar_elysia
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Database Setup & Seeding

Push the Drizzle schema to your MySQL database:

```bash
bun x drizzle-kit push
```

Run the seed script to populate initial Admin account & sample products:

```bash
bun run src/db/seed.ts
```

### 5. Running the Application

Start the development server with hot-reloading:

```bash
bun run dev
```

The server will start at `http://localhost:3000`.

---

## 📖 API Documentation & Endpoints

Interactive documentation is powered by **Scalar** and accessible at:
👉 **`http://localhost:3000/swagger`**

### Overview of Main Routes

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | Public | Register a new account |
| **POST** | `/auth/login` | Public | Login and receive a JWT |
| **GET** | `/user/profile` | Authenticated | View logged-in user profile |
| **PUT** | `/user/profile` | Authenticated | Update user profile |
| **GET** | `/admin/dashboard` | Admin Only | Access admin dashboard |
| **GET** | `/admin/users` | Admin Only | List all users |
| **DELETE** | `/admin/users/:id` | Admin Only | Delete a user by ID |
| **GET** | `/product/` | Public | List all products |
| **GET** | `/product/:id` | Public | Get single product details |
| **POST** | `/product/` | Admin Only | Create a new product |
| **PUT** | `/product/:id` | Admin Only | Update an existing product |
| **DELETE** | `/product/:id` | Admin Only | Delete a product |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).