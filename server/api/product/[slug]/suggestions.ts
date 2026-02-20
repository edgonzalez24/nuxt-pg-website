
import getPrismaClient from '../../../utils/prisma';

defineRouteMeta({
  openAPI: {
    summary: 'Get product suggestions',
    description: 'Returns up to 3 products that share tags with the product identified by the provided `slug`. Excludes the product itself.',
    tags: ['product'],
    parameters: [
      {
        name: 'slug',
        in: 'path',
        required: true,
        description: 'The slug identifier of the product to find suggestions for',
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'An object with a `suggestions` array (max 3) of product objects.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                suggestions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      slug: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      price: { type: 'number' },
                      images: { type: 'array', items: { type: 'string' } },
                      tags: { type: 'array', items: { type: 'string' } },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['id', 'slug', 'name', 'price'],
                  },
                },
              },
              required: ['suggestions'],
            },
            example: {
              suggestions: [
                {
                  id: 2,
                  slug: 'acme-widget',
                  name: 'ACME Widget',
                  description: 'Compact multi-use widget',
                  price: 1999,
                  images: ['https://example.com/images/acme-widget-1.jpg'],
                  tags: ['tools', 'gadget'],
                  createdAt: '2026-02-19T10:00:00Z',
                  updatedAt: '2026-02-19T10:00:00Z',
                },
              ],
            },
          },
        },
      },
      404: { description: 'Product not found' },
    },
  },
});

export default defineEventHandler(async (event) => {
  const slug  = getRouterParam(event, 'slug');
  const prisma = getPrismaClient();

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  await new Promise((resolve) => setTimeout(resolve, 2500));

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    });
  }

  const suggestions = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: product.tags,
      },
      NOT: {
        id: product.id,
      },
    },
    take: 3,
  });

  return {
    suggestions: suggestions.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      images: p.images,
      tags: p.tags,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
  };

});