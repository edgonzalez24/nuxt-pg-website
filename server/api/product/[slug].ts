
import getPrismaClient from '../../utils/prisma';

defineRouteMeta({
  openAPI: {
    tags: ['product'],
    summary: 'Get product by slug',
    description: 'Retrieve a single product by its slug identifier.',
    parameters: [
      {
        name: 'slug',
        in: 'path',
        description: 'Product slug (URL identifier)',
        required: true,
        schema: { type: 'string' as const },
      },
    ],
    responses: {
      200: {
        description: 'Product retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                id: { type: 'string' as const, description: 'Unique product ID' },
                slug: { type: 'string' as const, description: 'Product slug for URLs' },
                name: { type: 'string' as const, description: 'Product name' },
                description: { type: 'string' as const, description: 'Product description' },
                price: { type: 'number' as const, description: 'Product price in USD' },
                images: {
                  type: 'array' as const,
                  items: { type: 'string' as const, format: 'uri' },
                  description: 'Array of product image URLs',
                },
                tags: {
                  type: 'array' as const,
                  items: { type: 'string' as const },
                  description: 'Product tags/categories',
                },
                createdAt: { type: 'string' as const, format: 'date-time', description: 'Product creation date' },
                updatedAt: { type: 'string' as const, format: 'date-time', description: 'Product update date' },
              },
              required: ['id', 'slug', 'name', 'description', 'price', 'createdAt'],
            },
          },
        },
      },
      404: {
        description: 'Product not found',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: { message: { type: 'string' as const } },
            },
          },
        },
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: { message: { type: 'string' as const } },
            },
          },
        },
      },
    },
  }
});

export default defineEventHandler(async (event) => {
  const slug  = getRouterParam(event, 'slug');
  const prisma = getPrismaClient();

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    });
  }

  return product;

});