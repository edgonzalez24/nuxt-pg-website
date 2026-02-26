defineRouteMeta({
  openAPI: {
    summary: "Create product (admin)",
    description: "Creates a new product with the provided details. Requires admin access.",
    tags: ["Admin", "Product"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              slug: { type: "string", minLength: 3 },
              name: { type: "string", minLength: 3 },
              description: { type: "string", minLength: 10 },
              price: { type: "number", minimum: 0 },
              tags: { type: "array", items: { type: "string" }, minItems: 0 },
              images: { type: "array", items: { type: "string" }, minItems: 0 },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Product created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                product: { type: "object" },
              },
            },
          },
        },
      },
    },
  },
});

import getPrismaClient  from "../../../utils/prisma";
import { z } from 'zod';
  const bodySchema = z.object({
    slug: z.string().min(3),
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(0),
    tags: z.array(z.string()).min(0),
    images: z.array(z.string()).min(0),
  });

export default defineEventHandler(async (e) => {
  const prisma = getPrismaClient();
  const body = await readValidatedBody(e, bodySchema.parse);
  const product = await prisma.product.create({
    data: body,
  });
  return {
    message: 'Product created successfully',
    product,
  }
});