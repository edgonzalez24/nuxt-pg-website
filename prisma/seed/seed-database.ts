
import getPrismaClient from '../../server/utils/prisma.js';
import { products } from "./product.seed.js";
import { siteReviewData } from "./siteReviews.seed.js";


const prisma = getPrismaClient();

(async () => {
  await prisma.products.deleteMany();
  await prisma.siteReview.deleteMany();
  
  for (const product of products) {
    await prisma.products.create({ data: product });
  }

  for (const review of siteReviewData) {
    await prisma.siteReview.create({ data: review });
  }
})();