
import getPrismaClient from '../../server/utils/prisma';
import { products } from './products.seed';
import { siteReviewData } from "./site-reviews.seed";
import { users } from "./users.seed";
import { productReviews } from './product-reviews.seed';

import bcrypt from 'bcryptjs';

// Hash user passwords before seeding
const usersWithHashedPasswords = users.map(user => ({
  ...user,
  password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync(10)),
}));

const prisma = getPrismaClient();

(async () => {
  await prisma.productReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.siteReview.deleteMany();
  await prisma.user.deleteMany();
  
  
  for (const review of siteReviewData) {
    await prisma.siteReview.create({ data: review });
  }

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  
  for (const user of usersWithHashedPasswords) {
    await prisma.user.create({ data: user });
  }

  const productsInDb = await prisma.product.findMany();
  const usersInDb = await prisma.user.findMany();


  const productReviewsCreated = await Promise.all(
    productReviews.map(async (review) => {
      return {
        ...review,
        productId: productsInDb[Math.floor(Math.random() * productsInDb.length)].id,
        userId: usersInDb[Math.floor(Math.random() * usersInDb.length)].id,
      }
    })
  );


  for (const productReview of productReviewsCreated) {
    await prisma.productReview.create({ data: productReview });
  }
})();