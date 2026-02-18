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
                  slug: { type: 'string' as const, description: 'Product slug for URLs' },
                  name: { type: 'string' as const, description: 'Product name' },
                  description: { type: 'string' as const, description: 'Product description' },
                  price: { type: 'number' as const, description: 'Product price' },
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

export default defineEventHandler(event => {
  return 'Hello products/index'
})
