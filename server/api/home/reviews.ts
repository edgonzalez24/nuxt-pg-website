defineRouteMeta({
  openAPI: {
    tags: ['reviews'],
    summary: 'Get site reviews',
    description: 'Retrieves the 5 most recent site reviews ordered by creation date in descending order.',
    responses: {
      200: {
        description: 'Reviews retrieved successfully',
        content: {
          'application/json': {
            schema: {
              type: 'array' as const,
              items: {
                type: 'object' as const,
                properties: {
                  id: { type: 'string' as const, description: 'Unique review ID' },
                  name: { type: 'string' as const, description: 'Reviewer name' },
                  subtitle: { type: 'string' as const, description: 'Reviewer subtitle or title' },
                  description: { type: 'string' as const, description: 'Review content' },
                  profileImage: { type: 'string' as const, format: 'uri', description: 'URL to reviewer profile image' },
                  createdAt: { type: 'string' as const, format: 'date-time', description: 'Review creation date' },
                },
              },
            },
          },
        },
      },
      500: {
        description: 'Server error retrieving reviews',
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


import getPrismaClient from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const db = getPrismaClient();
  const reviews = await db.siteReview.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
})