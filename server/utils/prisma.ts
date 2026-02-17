import { PrismaClient } from '../../app/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

let prismaInstance: PrismaClient | null = null

const getPrismaClient = () : PrismaClient => {
  if (!prismaInstance) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    })

    prismaInstance = new PrismaClient({
      adapter,
    })
  }

  return prismaInstance
}

export default getPrismaClient

