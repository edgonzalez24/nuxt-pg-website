defineRouteMeta({
  openAPI: {
    tags: ['products'],
    summary: 'Get all products',
    description: 'Retrieves a paginated list of all available products in the catalog with optional filters.',
    parameters: [
      {
        name: 'limit',
        in: 'query',
        description: 'Number of products per page (default: 10, minimum: 1)',
        required: false,
        schema: {
          type: 'integer' as const,
          default: 10,
          minimum: 1,
        },
      },
      {
        name: 'offset',
        in: 'query',
        description: 'Number of products to skip (default: 0, minimum: 0)',
        required: false,
        schema: {
          type: 'integer' as const,
          default: 0,
          minimum: 0,
        },
      },
    ],
    responses: {
      200: {
        description: 'Products retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                products: {
                  type: 'array' as const,
                  items: {
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
                        description: 'Array of product image URLs' 
                      },
                      tags: { 
                        type: 'array' as const, 
                        items: { type: 'string' as const },
                        description: 'Product tags/categories' 
                      },
                      createdAt: { type: 'string' as const, format: 'date-time', description: 'Product creation date' },
                    },
                  },
                  description: 'Array of product objects',
                },
                totalPages: { type: 'integer' as const, description: 'Total number of pages' },
                currentPage: { type: 'integer' as const, description: 'Current page number' },
                perPage: { type: 'integer' as const, description: 'Number of products per page' },
                total: { type: 'integer' as const, description: 'Total number of products' },
              },
              required: ['products', 'totalPages', 'currentPage', 'perPage', 'total'],
            },
          },
        },
      },
      500: {
        description: 'Server error retrieving products',
        content: {
          'application/json': {
            schema: {
              type: 'object' as const,
              properties: {
                message: { type: 'string' as const, description: 'Error message' },
              },
            },
          },
        },
      },
    },
  }
});

import getPrismaClient from '../../utils/prisma';

export default defineEventHandler(async event => {
  const prisma = getPrismaClient();
  const query = getQuery(event);
  let limit = parseInt(query.limit as string) || 10;
  let offset = parseInt(query.offset as string) || 0; 

  if(isNaN(limit) || limit <= 1) limit = 10;
  if(isNaN(offset) || offset < 0) offset = 0;


  const products = await prisma.product.findMany({
    take: limit,
    skip: offset,
  });

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / limit);
  return {
    products,
    totalPages,
    currentPage: Math.floor(offset / limit) + 1,
    perPage: limit,
    total
  };
})
