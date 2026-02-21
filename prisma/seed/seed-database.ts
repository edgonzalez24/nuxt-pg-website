
import getPrismaClient from '../../server/utils/prisma.js';
import { products } from "./products.seed.js";
import { siteReviewData } from "./siteReviews.seed.js";
import { users } from "./users.seed.js";

import bcrypt from 'bcryptjs';

// Hash user passwords before seeding
const usersWithHashedPasswords = users.map(user => ({
  ...user,
  password: bcrypt.hashSync(user.password,  bcrypt.genSaltSync(10)),
}));

const prisma = getPrismaClient();

(async () => {
  await prisma.product.deleteMany();
  await prisma.siteReview.deleteMany();
  await prisma.user.deleteMany();
  
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  for (const review of siteReviewData) {
    await prisma.siteReview.create({ data: review });
  }
  for (const user of usersWithHashedPasswords) {
    await prisma.user.create({ data: user });
  }
})();