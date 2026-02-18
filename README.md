# Nuxt Minimal Starter

Modern web application built with Nuxt.js, Vue, TypeScript, Prisma and PostgreSQL. This document describes the tech stack, setup and main features of the app.

![Nuxt](https://img.shields.io/badge/Nuxt-4.1.3-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.4.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20%2B%20Neon-Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

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
   npm run prisma:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed database (optional)
   npm run db:seed
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
│   ├── components/         # Vue components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── home/           # Landing page components
│   │   ├── product/        # Product-related components
│   │   └── shared/         # Shared UI components
│   ├── layouts/            # Application layouts
│   ├── pages/              # Pages and routes
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (public)/       # Public pages
│   │   └── dashboard/      # Dashboard pages
│   ├── generated/          # Generated code
│   │   └── prisma/         # Generated Prisma client
│   └── utils/              # Frontend utilities
├── prisma/                 # Prisma configuration
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Database seed script
├── server/                 # Nuxt server
│   ├── api/                # API routes
│   └── middleware/         # Server middleware
├── shared/                 # Shared code
│   ├── types/              # TypeScript types
│   └── utils/              # Shared utilities
└── public/                 # Static assets
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
