import { Prisma, PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});


const siteReviewData: Prisma.SiteReviewCreateInput[] = [
  {
      name: "Nuxt.js",
      subtitle: "The Intuitive Vue Framework",
      description:
        "Nuxt.js is a powerful and intuitive framework for building server-side rendered Vue.js applications. It provides a seamless development experience with features like automatic code splitting, server-side rendering, and a rich ecosystem of modules. With Nuxt.js, developers can easily create performant and SEO-friendly web applications while enjoying the flexibility of Vue.js.",
    },
    {
      name: "Prisma",
      subtitle: "Next-Generation ORM for Node.js and TypeScript",
      description:
        "Prisma is a next-generation Object-Relational Mapping (ORM) tool for Node.js and TypeScript. It provides a type-safe and intuitive API for working with databases, allowing developers to easily query and manipulate data. Prisma supports various databases, including PostgreSQL, MySQL, SQLite, and MongoDB. With Prisma, developers can boost their productivity and build robust applications with confidence.",
    },
];



export async function main() {
  for (const u of siteReviewData) {
    await prisma.siteReview.create({ data: u });
  }
}

main();