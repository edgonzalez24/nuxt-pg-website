# Nuxt Minimal Starter

Modern web application built with Nuxt.js, Vue, TypeScript, Prisma and PostgreSQL. This document describes the tech stack, setup and main features of the app.

![Nuxt](https://img.shields.io/badge/Nuxt-4.1.3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.4.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20%2B%20Neon-Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.9.0-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

## 🚀 Tech Stack

### Frontend
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" width="20" height="20"/> **Nuxt.js 4** – Vue framework with SSR and static generation
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="20" height="20"/> **Vue.js 3** – Progressive JavaScript framework
- <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" width="20" height="20"/> **Tailwind CSS 4** – Utility-first CSS framework
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20"/> **TypeScript** – Typed superset of JavaScript
- **Nuxt UI** – Component system for Nuxt
- **Nuxt Icon** – Icon integration for Nuxt
- **Nuxt Image** – Image optimization for Nuxt

### Backend & Database
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" width="20" height="20"/> **Prisma 7** – Modern type-safe ORM
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="20" height="20"/> **PostgreSQL** – Relational database
- <img src="https://avatars.githubusercontent.com/u/121837880?s=200&v=4" width="20" height="20"/> **Neon** – Serverless Postgres in the cloud (used as the managed PostgreSQL provider)
- **Prisma Adapter PG** – PostgreSQL adapter for Prisma

### Storage & Media
- ☁️ **Cloudinary 2.9** – Cloud-based image and video management service for storing and optimizing media assets

### Developer Tooling
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="20" height="20"/> **ESLint** – JavaScript/TypeScript linter
- **Zod** – TypeScript-first schema validation
- **TSX** – TypeScript runner for Node.js
- **Scalar** – Beautiful API documentation and testing UI for OpenAPI

## 📋 Features

- ✅ **Authentication** – Login and registration flow
- ✅ **Admin dashboard** – Management panel for data
- ✅ **Product catalog** – Browse and manage products/services
- ✅ **Review system** – Site reviews stored via Prisma
- ✅ **Pre-rendered public pages** – Better SEO and performance
- ✅ **Responsive design** – Works across devices
- ✅ **Type-safe data layer** – End-to-end types with TypeScript and Prisma

## 📸 Application Screenshots

Here are some screenshots showcasing the application interface and functionality:

### Home Page
![Application Evidence 1](screenshots/evidence-app.png)

### Product Catalog
![Application Evidence 2](screenshots/evidence-app-2.png)

### Product Details
![Application Evidence 3](screenshots/evidence-app-3.png)

## 🛠️ Setup

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL instance
- npm, pnpm, yarn or bun

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   # npm
   npm install
   
   # pnpm
   pnpm install
   
   # yarn
   yarn install
   
   # bun
   bun install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root. Example using a Neon Postgres connection string:
   ```env
   # Example Neon connection string
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   bun prisma:generate
   
   # Run database migrations
   bun db:migrate
   
   # Seed database (optional)
   bun db:seed
   ```

## 🚀 Usage

### API Documentation

The API is documented with **OpenAPI** specifications and can be explored using **Scalar**. When the development server is running, access the interactive API documentation at:

```
http://localhost:3000/_scalar
```

Scalar provides:
- 📖 **Interactive API documentation** – Browse all endpoints with detailed descriptions
- 🧪 **Request testing** – Test endpoints directly from the UI
- 📋 **Schema exploration** – View request/response schemas and types
- 🔒 **Authentication support** – Test secured endpoints

### Development server

Start the development server at `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Authentication & Test Users

The application includes a complete authentication system with session management. After seeding the database, you can use the following test users to log in:

#### Test Users

| Email | Password | Roles | Description |
|-------|----------|-------|-------------|
| `lionel@google.com` | `Abc123!@#` | `admin`, `user` | Admin user with full access |
| `cristiano@google.com` | `Abc123!@#` | `user` | Regular user |
| `kylian@google.com` | `Abc123!@#` | `user` | Regular user |
| `luka@google.com` | `Abc123!@#` | `user` | Regular user |
| `kevin@google.com` | `Abc123!@#` | `user` | Regular user |

#### Login

1. Navigate to the login page at `http://localhost:3000/login`
2. Enter one of the test user credentials from the table above
3. After successful login, you'll be redirected to the home page

#### Features

- 🔐 **Secure authentication** – Passwords are hashed using bcrypt
- 🍪 **Session management** – Uses cookie-based sessions via `nuxt-auth-utils`
- 👤 **Role-based access** – Admin users have access to the dashboard and admin endpoints
- 🛡️ **Protected routes** – Middleware protects authenticated routes
- 📝 **User registration** – New users can register at `/register`

#### Admin Access

The user `lionel@google.com` has admin privileges and can:
- Access the admin dashboard at `/dashboard`
- Manage products (create, update, delete)
- Access admin-only API endpoints

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Preview the production build locally:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📜 Available Scripts

| Script           | Description                         |
|------------------|-------------------------------------|
| `dev`            | Start development server           |
| `build`          | Build application for production   |
| `generate`       | Generate static site               |
| `preview`        | Preview production build           |
| `prisma:generate`| Generate Prisma client             |
| `db:migrate`     | Run database migrations            |
| `db:seed`        | Seed database with initial data    |



## 📁 Project Structure

```
Nuxt project/
├── app/                    # Nuxt application
│   ├── assets/             # Static assets (CSS, images)
│   │   └── css/            # Stylesheets
│   ├── components/         # Vue components
│   │   ├── dashboard/      # Dashboard components (Navbar, Sidebar)
│   │   ├── home/           # Landing page components (CTA, Features, Stack, Testimonials)
│   │   ├── icons/          # Icon components
│   │   ├── modal/          # Modal components (Review)
│   │   ├── pricing/        # Pricing components (Table)
│   │   ├── product/        # Product-related components (Card, Reviews, Suggestions)
│   │   ├── products/       # Products listing components (Grid)
│   │   └── shared/         # Shared UI components (Footer, Header, Pagination)
│   ├── composables/        # Vue composables
│   │   ├── admin/          # Admin composables (useAdminProduct)
│   │   ├── useAuthentication.ts
│   │   ├── usePaginatedProducts.ts
│   │   └── useProduct.ts
│   ├── generated/          # Generated code
│   │   └── prisma/         # Generated Prisma client
│   │       ├── models/     # Prisma models (Product, ProductReview, SiteReview, User)
│   │       └── internal/   # Internal Prisma types
│   ├── layouts/            # Application layouts
│   │   ├── dashboard-layout.vue
│   │   ├── default.vue
│   │   └── login-layout.vue
│   ├── middleware/         # Client-side middleware
│   │   ├── auth.ts         # Authentication middleware
│   │   └── not-authenticated.ts
│   ├── pages/              # Pages and routes
│   │   ├── (auth)/         # Authentication pages (login, register)
│   │   ├── (public)/       # Public pages (about, contact, index, pricing, product, products)
│   │   └── dashboard/      # Dashboard pages (index, product, products)
│   └── utils/              # Frontend utilities
├── prisma/                 # Prisma configuration
│   ├── schema.prisma       # Prisma schema (models, relationships, configuration)
│   ├── migrations/         # Database migrations
│   │   ├── migration_lock.toml  # Migration lock file
│   │   └── [timestamp]_*/       # Migration directories with SQL files
│   └── seed/               # Database seed scripts
│       ├── seed-database.ts        # Main seed runner
│       ├── products.seed.ts        # Product seeding logic
│       ├── product-reviews.seed.ts # Product reviews seeding logic
│       ├── site-reviews.seed.ts    # Site reviews seeding logic
│       └── users.seed.ts           # Users seeding logic
├── server/                 # Nuxt server
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   │   └── product/    # Product admin endpoints (CRUD)
│   │   ├── auth/           # Authentication endpoints (login)
│   │   ├── home/           # Home page endpoints (reviews)
│   │   ├── product/        # Product endpoints (by slug, reviews, suggestions)
│   │   └── products/       # Products listing endpoint
│   ├── middleware/         # Server middleware
│   │   └── admin.ts        # Admin authentication middleware
│   ├── routes/             # Server routes
│   └── utils/              # Server utilities
│       └── prisma.ts       # Prisma client instance
├── shared/                 # Shared code
│   ├── types/              # TypeScript types
│   │   ├── auth.d.ts       # Authentication types
│   │   ├── product.ts      # Product types
│   │   └── site-review.ts  # Site review types
│   └── utils/              # Shared utilities
│       ├── date-formats.ts
│       ├── file-upload.ts
│       └── format-curency.ts
├── screenshots/            # Project screenshots
│   ├── scalar-home.png     # Scalar home page screenshot
│   └── scalar-product.png  # Scalar product endpoint screenshot
├── public/                 # Static assets (favicon, robots.txt, og-image)
├── nuxt.config.ts          # Nuxt configuration
├── prisma.config.ts        # Prisma configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## 🗄️ Database

### `SiteReview` model

```prisma
model SiteReview {
  id          Int      @id @default(autoincrement())
  name        String
  subtitle    String
  description String
  createdAt   DateTime @default(now())
}
```

### Neon notes

- The project is designed to work well with **Neon** as a managed PostgreSQL service.  
- Make sure your Neon project has SSL enabled (e.g. `sslmode=require` in `DATABASE_URL`).  
- You can use different databases/branches in Neon by changing only the `DATABASE_URL` value.

## 🔧 Configuration

### Nuxt config

The app is configured with:
- **Pre-rendered** public routes for improved SEO
- **Automatic link crawling** for route discovery
- **Nuxt modules**: ESLint, Fonts, Icon, Image, UI

### Prisma config

The Prisma client is generated into `app/generated/prisma` for better integration with the Nuxt app.

## 📚 API Documentation with OpenAPI & Scalar

### Adding OpenAPI Documentation to Endpoints

All API endpoints use OpenAPI v3.0 specifications via `defineRouteMeta`. Here's an example:

```typescript
defineRouteMeta({
  openAPI: {
    tags: ['products'],
    summary: 'Get all products',
    description: 'Retrieves a list of all available products in the catalog.',
    responses: {
      200: {
        description: 'Products retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'array' as const,
              items: {
                type: 'object' as const,
                properties: {
                  id: { type: 'string' as const, description: 'Unique product ID' },
                  name: { type: 'string' as const, description: 'Product name' },
                },
              },
            },
          },
        },
      },
    },
  }
});
```

### Viewing API Documentation

1. Start the development server: `bun dev`
2. Navigate to `http://localhost:3000/_scalar`
3. Explore endpoints, test requests, and view schemas in the interactive Scalar UI

#### Screenshots

**Scalar Home Page:**
![Scalar Home](screenshots/scalar-home.png)

**Scalar Product Endpoint:**
![Scalar Product](screenshots/scalar-product.png)

## 📚 Resources

- [Nuxt documentation](https://nuxt.com/docs)
- [Prisma documentation](https://www.prisma.io/docs)
- [Vue documentation](https://vuejs.org/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Neon documentation](https://neon.tech/docs)
- [Scalar Nuxt](https://scalar.com/products/api-references/integrations/nuxt)

## 📝 License

This project is private and for educational purposes only.

---

Built with ❤️ using Nuxt.js and Vue.js.
