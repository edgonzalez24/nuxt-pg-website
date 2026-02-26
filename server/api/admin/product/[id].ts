defineRouteMeta({
  openAPI: {
    summary: "Get product by ID (admin)",
    description: "Retrieve a single product by its numeric ID. Requires admin access.",
    tags: ["Admin", "Product"],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer", format: "int32" },
        description: "Numeric ID of the product",
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Product retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                slug: { type: "string", example: "sample-product" },
                name: { type: "string", example: "Sample Product" },
                description: { type: "string", example: "A nice product." },
                price: { type: "number", format: "float", example: 19.99 },
                images: { type: "array", items: { type: "string" } },
                tags: { type: "array", items: { type: "string" } },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
      404: {
        description: "Product not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                statusCode: { type: "integer", example: 404 },
                message: { type: "string", example: "Product not found" },
              },
            },
          },
        },
      },
    },
  },
});

import getPrismaClient  from "../../../utils/prisma";

export default defineEventHandler(async (e) => {
  const rawId = getRouterParam(e, 'id') as string;
  const id = parseInt(rawId, 10);
  const prisma = getPrismaClient();

  if (rawId === 'new') {
    return {
      id: 0,
      slug: '',
      name: '',
      description: '',
      price: 0,
      images: [],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    });
  }
  
  return product;
});