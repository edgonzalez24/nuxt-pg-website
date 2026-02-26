import getPrismaClient  from "../../../utils/prisma";
import { z } from 'zod';
  const bodySchema = z.object({
    slug: z.string().min(3),
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(0),
    tags: z.array(z.string()).min(0),
    images: z.array(z.string()).min(0),
  });

export default defineEventHandler(async (e) => {
  const prisma = getPrismaClient();
  const body = await readValidatedBody(e, bodySchema.parse);
  const product = await prisma.product.create({
    data: body,
  });
  return {
    message: 'Product created successfully',
    product,
  }
});