
import getPrismaClient from '../../server/utils/prisma.js';
import { products } from "./products.seed.js";
import { siteReviewData } from "./siteReviews.seed.js";


const prisma = getPrismaClient();

(async () => {
  await prisma.product.deleteMany();
  await prisma.siteReview.deleteMany();
  
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  for (const review of siteReviewData) {
    await prisma.siteReview.create({ data: review });
  }
})();