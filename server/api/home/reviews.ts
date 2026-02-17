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