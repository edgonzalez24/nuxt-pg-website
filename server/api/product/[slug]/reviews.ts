defineRouteMeta({
  openAPI: {
    summary: 'Get product reviews',
    description: 'Returns up to 10 reviews for the product identified by the provided `slug`, ordered by creation date (newest first). Also indicates if the authenticated user has already posted a review for this product.',
    tags: ['product'],
    parameters: [
      {
        name: 'slug',
        in: 'path',
        required: true,
        description: 'The slug identifier of the product to get reviews for',
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'An object containing an array of product reviews and a flag indicating if the user has posted a review',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                productReviews: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      rating: { type: 'integer' },
                      review: { type: 'string' },
                      name: { type: 'string' },
                      userTitle: { type: 'string' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                      productId: { type: 'integer' },
                      userId: { type: 'integer' },
                    },
                    required: ['id', 'rating', 'review', 'name', 'userTitle', 'productId', 'userId'],
                  },
                },
                hasUserPostedReview: {
                  type: 'boolean',
                  description: 'Indicates if the authenticated user has already posted a review for this product',
                },
              },
              required: ['productReviews', 'hasUserPostedReview'],
            },
            example: {
              productReviews: [
                {
                  id: 1,
                  rating: 5,
                  review: 'Excellent product! Highly recommend it.',
                  name: 'John Doe',
                  userTitle: 'Verified Buyer',
                  createdAt: '2026-02-19T10:00:00Z',
                  updatedAt: '2026-02-19T10:00:00Z',
                  productId: 1,
                  userId: 1,
                },
                {
                  id: 2,
                  rating: 4,
                  review: 'Good quality, fast shipping.',
                  name: 'Jane Smith',
                  userTitle: 'Verified Buyer',
                  createdAt: '2026-02-18T15:30:00Z',
                  updatedAt: '2026-02-18T15:30:00Z',
                  productId: 1,
                  userId: 2,
                },
              ],
              hasUserPostedReview: false,
            },
          },
        },
      },
    },
  },
});

import getPrismaClient from '../../../utils/prisma';

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const slug  = getRouterParam(event, 'slug');
  const session = await getUserSession(event);
  const userId = session?.user?.id;
  

  const productReviews = await prisma.productReview.findMany({
    where: {
      product: {
        slug,
      },
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  });

  let userHasReview = false;
  if (userId) {
    userHasReview = !!await prisma.productReview.findFirst({
      where: {
        product: {
          slug,
        },
        userId: +userId!,
      },
    })
  }


  return  {
    productReviews: productReviews,
    hasUserPostedReview: !!userHasReview,
  }
});