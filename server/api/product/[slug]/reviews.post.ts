defineRouteMeta({
  openAPI: {
    summary: 'Create a product review',
    description: 'Creates a new review for the product identified by the provided `slug`. Requires user authentication. Users can only post one review per product.',
    tags: ['product'],
    parameters: [
      {
        name: 'slug',
        in: 'path',
        required: true,
        description: 'The slug identifier of the product to review',
        schema: { type: 'string' },
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              rating: {
                type: 'integer',
                minimum: 1,
                maximum: 5,
                description: 'Rating from 1 to 5',
              },
              review: {
                type: 'string',
                description: 'The review text (minimum 1 character)',
              },
              userTitle: {
                type: 'string',
                description: 'Title or role of the reviewer',
              },
            },
            required: ['rating', 'review', 'userTitle'],
          },
          example: {
            rating: 5,
            review: 'Excellent product! Highly recommend it.',
            userTitle: 'Verified Buyer',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'The created review object',
        content: {
          'application/json': {
            schema: {
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
            example: {
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
          },
        },
      },
      400: {
        description: 'Bad request - User name missing or review already exists for this product',
      },
      404: {
        description: 'Product not found',
      },
    },
  },
});

import getPrismaClient from '../../../utils/prisma';
import { z } from 'zod';

const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(1),
  userTitle: z.string()
})

export default defineEventHandler(async (event) => {
  const prisma = getPrismaClient();
  const body = await readValidatedBody(event, bodySchema.parse);
  const slug = getRouterParam(event, 'slug');

  const session = await requireUserSession(event);
  const userId = session.user.id;

  if(!session.user.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request'
    })
  }

  const product = await prisma.product.findUnique({
    where: {
      slug
    }
  });

  if(!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  };

  const existingReview = await prisma.productReview.findFirst({
    where: {
      productId: product.id,
      userId: +userId
    }
  });

  if(existingReview) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You have already posted a review for this product'
    })
  };

  const review = await prisma.productReview.create({
    data: {
      name: session.user.name,
      rating: body.rating,
      userTitle: body.userTitle,
      review: body.review,
      productId: product.id,
      userId: +userId
    }
  });

  return review;
});